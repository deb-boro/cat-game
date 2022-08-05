const router = require('express').Router()
const sequelize = require('../config/connection')
const { Cat, User } = require('../models')

router.get('/', (req, res) => {
  console.log(req.session)
  Cat.findAll({
    attributes: ['id', 'name', 'color', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email', 'created_at'],
      },
    ],
  })
    .then((dbCatData) => {
      // pass a single post object into the homepage template
      const cats = dbCatData.map((cat) => cat.get({ plain: true }))
      res.render('homepage', {
        cats,
        loggedIn: req.session.loggedIn,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

module.exports = router
