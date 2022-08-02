const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
    {
        name: 'bradley',
        email: 'bradley@gmail.com',
        password: '12345'
    },
    {
        name: 'deb',
        email: 'deb@gmail.com',
        password: '67890',
    },
    {
        name: 'andrew',
        email: 'andrew@gmail.com',
        password: '00000'
    }
]


// const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});
const userfunction  = () =>{
    User.bulkCreate(userdata);
}
module.exports = userfunction;