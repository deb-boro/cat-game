const seedUsers = require('./users')
const seedCats = require('./cat-profiles')
const seedLeaderboard = require('./leader-seed')

const sequelize = require('../config/connection')

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('--------------')
  //await userfunction();
  await seedUsers()
  console.log('--------------')
  // await catfunction();
  await seedCats()
  console.log('--------------')
  await seedLeaderboard()
  console.log('--------------')

  process.exit(0)
}

seedAll()
