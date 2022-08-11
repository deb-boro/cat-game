const router = require('express').Router()
const { Cat, Clicks, User } = require('../../models')
const sequelize = require('../../config/connection');
// const { ValidationError } = require('sequelize/types');

//get all cats
router.get('/', (req, res) => {
  Cat.findAll({
    attributes: [
      'id', 
      'name', 
      'color',
      [sequelize.literal('(SELECT COUNT(*) FROM clicks WHERE cat.id = clicks.cat_id)'), 'click_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbCatData) => {
      res.json(dbCatData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  Cat.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id', 
      'name', 
      'color',
      [sequelize.literal('(SELECT COUNT(*) FROM clicks WHERE cat.id = clicks.cat_id)'), 'click_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
  .then((dbCatData) => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No cat found with this id' })
      return;
    }
    res.json(dbCatData);

    res.render('training', {
      text: 'CAT click will happen here',
      loggedIn: req.session.loggedIn,
    })
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
    .then((dbCatData) => {
      res.json(dbCatData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put('/clicks', (req, res) => {
  Clicks.create({
    user_id: req.body.user_id,
    cat_id: req.body.cat_id
  }).then(() => {
    return Cat.findOne({
      where: {
        id: req.body.cat_id
      },
      attributes: [
        'id',
        'name',
        'color',
        'user_id',
        [sequelize.literal('(SELECT COUNT(*) FROM clicks WHERE cat.id = clicks.cat_id)'), 'click_count']
      ]
    })
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  Cat.update(
    {
      name: req.body.name,
      color: req.body.color
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
})


module.exports = router
