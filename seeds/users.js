<<<<<<< HEAD
const { User } = require('../models');

const userdata = [
    {
        username: 'bradley',
        email: 'bradley@gmail.com',
        password: '12345'
    },
    {
        username: 'deb',
        email: 'deb@gmail.com',
        password: '67890',
    },
    {
        username: 'andrew',
        email: 'andrew@gmail.com',
        password: '00000'
    }
]


// const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});
const userfunction  = () => User.bulkCreate(userdata);

module.exports = userfunction;
=======
const sequelize = require('../config/connection')
const { User } = require('../models')

const userdata = [
  {
    username: 'bradley',
    email: 'bradley@gmail.com',
    password: '12345',
  },
  {
    username: 'deb',
    email: 'deb@gmail.com',
    password: '67890',
  },
  {
    username: 'andrew',
    email: 'andrew@gmail.com',
    password: '00000',
  },
]

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true })
// const userfunction = () => {
//   User.bulkCreate(userdata)
// }
module.exports = seedUsers
>>>>>>> main
