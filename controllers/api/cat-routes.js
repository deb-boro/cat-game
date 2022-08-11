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

      const catID = []
      for (let i = 0; i < dbCatData.length; i++) {
        if (dbCatData[i].user.username === req.session.username) {
          // console.log('id is :' + (i + 1))
          catID.push(i + 1)
          break
        }
      }
      const cats = dbCatData.map((cat) => cat.get({ plain: true }))
      res.render('leaderboard', {
        cats,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        cat_id: catID[0],
    })
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


    res.render('training', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
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
  console.log(req.session)
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Cat.click({ ...req.body, user_id: req.session.user_id }, { Clicks, Cat, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
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
