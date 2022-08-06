const router = require('express').Router()
const sequelize = require('../config/connection')
const { Cat, User } = require('../models')

router.get('/', (req, res) => {
  console.log(req.session)
  Cat.findAll({
    attributes: [
      'id',
      'name',
      'color'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    ]
  })
  .then((dbCatData) => {
    // pass a single post object into the homepage template
    const cats = dbCatData.map(cat => cat.get({ plain: true }))
    res.render('homepage', {
      cats,
      loggedIn: req.session.loggedIn,
    });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }

  res.render('login');
})

router.get('/cats/:id', (req, res) => {
  Cat.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'color'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No cat found with this id' });
      return;
    }

    const cat = dbCatData.get({ plain: true });

    res.render('single-cat', {
      cat,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router