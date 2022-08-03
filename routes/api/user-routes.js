const router = require('express').Router()
const res = require('express/lib/response')
const { User } = require('../../models')
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

module.exports = router
