const router = require('express').Router()
const res = require('express/lib/response')
const { Cat, User } = require('../../models')

// get all cats
router.get('/', (req, res) => {
  Cat.findAll()
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  Cat.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'color',
      'user_id'
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
    res.json(dbCatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

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
