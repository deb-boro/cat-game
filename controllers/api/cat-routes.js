const router = require('express').Router()
const { Cat, User } = require('../../models')
const sequelize = require('../../config/connection')

//get all cats
router.get('/', (req, res) => {
  Cat.findAll({
    attributes: ['id', 'name', 'color', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
  .then((dbCatData) => res.json(dbCatData))
  .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  Cat.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
     'id',
     'name',
     'color',
     'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No cat found with this id' })
        return
      }
      res.json(dbCatData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  Cat.create({
    name: req.body.name,
    color: req.body.color,
    user_id: req.body.user_id,
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
  Cat.update(
    {
      color: req.body.color,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No cat found with this id' })
        return
      }
      res.json(dbCatData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})
router.delete('/:id', (req, res) => {
  Cat.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No post found with this id' })
        return
      }
      res.json(dbCatData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router
