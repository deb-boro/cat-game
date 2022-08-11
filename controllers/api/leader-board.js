const router = require('express').Router()
const res = require('express/lib/response')
const { User, Cat } = require('../../models')

router.get('/', (req, res) => {
    Cat.findAll({
       order: 'click_count'
    })
    .then(dbLeaderData => res.json(dbLeaderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router