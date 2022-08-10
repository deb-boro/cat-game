const router = require('express').Router()
const res = require('express/lib/response')
const { User, Cat } = require('../../models')

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
});

// GET single user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Cat,
        attributes: [ 'id', 'name', 'color' ]
      }
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//POST new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true

      console.log(dbUserData.username)

      res.json(dbUserData)
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
  .then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' })
      return
    }

    const validPassword = dbUserData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.loggedIn = true
      
      console.log(dbUserData.username)

      res.json({ user: dbUserData, message: 'You are now logged in!' })
    })
  })
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
});

//update existing user data
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData) => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' })
      return
    }
    res.json(dbUserData)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
})

//DELETE single user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id',
        })
        res.json(dbUserData)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});



module.exports = router
