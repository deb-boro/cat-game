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
});

router.post('/', (req, res) => {
  Cat.create({
    name: req.body.name,
    color: req.body.color,
    user_id: req.body.user_id
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router
