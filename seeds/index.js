const userfunction = require('./users');
const catfunction = require('./cat-profiles');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await catfunction();
    console.log('--------------');
    await userfunction();
    console.log('--------------');
  
    process.exit(0);
  };

seedAll();