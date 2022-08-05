const router = require('express').Router()
const userRoutes = require('./user-routes')
const catRoutes = require('./cat-routes')

router.use('/users', userRoutes)
router.use('/cats', catRoutes)

module.exports = router
