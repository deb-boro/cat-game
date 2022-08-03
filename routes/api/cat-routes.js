const router = require('express').Router()
const res = require('express/lib/response')
const { Cat } = require('../../models')

// get all cats
router.get('/', (req, res) => {
  Cat.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
