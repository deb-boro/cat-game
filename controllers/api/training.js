const router = require('express').Router()
const res = require('express/lib/response')
const { Cat } = require('../../models')

// get all cats
router.put('/:id', (req, res) => {
  Cat.update(clicks)
    .then(clicks + 1)
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router