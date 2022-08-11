const router = require('express').Router()
const userRoutes = require('./user-routes')
const catRoutes = require('./cat-routes')
const leaderRoutes = require('./leader-board')

router.use('/users', userRoutes)
router.use('/cats', catRoutes)
router.use('/leaderboard', leaderRoutes)

module.exports = router
