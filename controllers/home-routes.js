const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Cat } = require('../models')

//set up the main homepage route
router.get('/', (req, res) => {
  console.log(req.session)
  Cat.findAll({
    attributes: ['id', 'name', 'color'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbCatData) => {
      // pass a array object into the homepage template
      // console.log(dbCatData.length)

      const catID = []
      for (let i = 0; i < dbCatData.length; i++) {
        if (dbCatData[i].user.username === req.session.username) {
          // console.log('id is :' + (i + 1))
          catID.push(i + 1)
          break
        }
      }

      const cats = dbCatData.map((cat) => cat.get({ plain: true }))
      res.render('homepage', {
        cats,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        user_id: req.session.user_id,
        cat_id: catID[0],
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


// router.get('/cats/:id', (req, res) => {
//   // Cat.findOne({
//   //   where: {
//   //     id: req.params.id,
//   //   },
//   //   attributes: ['id', 'name', 'color'],
//   //   include: [
//   //     {
//   //       model: User,
//   //       attributes: ['username'],
//   //     },
//   //   ],
//   // })
//   //   .then((dbCatData) => {
//   //     if (!dbCatData) {
//   //       res.status(404).json({ message: 'No cat found with this id' })
//   //       return
//   //     }

//   //     const cat = dbCatData.get({ plain: true })

//   res.render('training', {
//     text: 'CAT click will happen here',
//     loggedIn: req.session.loggedIn,
//   })
// })
// .catch((err) => {
//   console.log(err)
//   res.status(500).json(err)
// })
//})

module.exports = router
