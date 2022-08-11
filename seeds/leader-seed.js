const sequelize = require('../config/connection')
const { Clicks } = require('../models')

const clickdata = [
  {
    user_id: 1,
    cat_id: 3
  },
  {
    user_id: 1,
    cat_id: 3
  },
  {
    user_id: 2,
    cat_id: 2
  },
  {
    user_id: 3,
    cat_id: 1
  },
  {
    user_id: 2,
    cat_id: 1
  },
  {
    user_id: 3,
    cat_id: 2
  },
  {
    user_id: 1,
    cat_id: 2
  },
  {
    user_id: 2,
    cat_id: 3
  },
  {
    user_id: 3,
    cat_id: 3
  },
  {
    user_id: 1,
    cat_id: 1
  },
]

const seedLeaderboard = () => Clicks.bulkCreate(clickdata);

module.exports = seedLeaderboard;