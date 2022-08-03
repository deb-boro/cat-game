const sequelize = require('../config/connection');
const { Cat } = require('../models');

const catdata = [
    {
        name: 'rocky',
        color: 'blue',
        user_id: 2
    },
    {
        name: 'bullwinkle',
        color: 'orange',
        user_id: 3
    },
    {
        name: 'garfield',
        color: 'red',
        user_id: 1
    }
];


// const seedCats = () => Cat.bulkCreate(catdata, {individualHooks: true});
const catfunction  = () => {
    Cat.bulkCreate(catdata);
}

module.exports = catfunction;