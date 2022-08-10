const Cat = require('./Cat')
const User = require('./User')
const Clicks = require('./Clicks')

User.hasOne(Cat, {
  foreignKey: 'user_id',
})

Cat.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
})

Cat.hasMany(Clicks, {
  foreignKey: 'cat_id'
})

Clicks.belongsTo(Cat, {
  foreignKey: 'cat_id',
  onDelete: 'SET NULL'
});

module.exports = { Cat, User, Clicks }
