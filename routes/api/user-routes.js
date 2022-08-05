const router = require('express').Router()
const res = require('express/lib/response')
const { User, Cat } = require('../../models')
const sequelize = require('../../config/connection')

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'username',
      'email'
    ],
    include: [
      {
        model: Cat,
        attributes: [ 'id', 'name', 'color' ]
      }
    ]
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbCatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router
