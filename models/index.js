const Cat = require('./Cat')
const User = require('./User')

User.hasMany(Cat, {
  foreignKey: 'user_id',
})

Cat.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
})

module.exports = { Cat, User }
