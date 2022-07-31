const sequelize = require('../config/connection');
const { Cat } = require('../models');

const catdata = [
    {
        name: 'rocky',
        color: 'blue'
    },
    {
        name: 'bullwinkle',
        color: 'orange'
    },
    {
        name: 'garfield',
        color: 'red'
    }
];


// const seedCats = () => Cat.bulkCreate(catdata, {individualHooks: true});
const catfunction  = () => {
    Cat.bulkCreate(catdata);
}

module.exports = catfunction;