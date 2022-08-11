const Cat = require('./Cat')
const User = require('./User')
const Clicks = require('./Clicks')

User.hasMany(Cat, {
  foreignKey: 'user_id',
});

Cat.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.belongsToMany(Cat, {
  through: Clicks,
  as: 'clicked_cats',
  foreignKey: 'user_id'
});

Cat.belongsToMany(User, {
  through: Clicks,
  as: 'clicked_cats',
  foreignKey: 'cat_id'
});

Clicks.belongsTo(User, {
  foreignKey: 'user_id'
});

Clicks.belongsTo(Cat, {
  foreignKey: 'cat_id'
});

User.hasMany(Clicks, {
  foreignKey: 'user_id'
});

Cat.hasMany(Clicks, {
  foreignKey: 'cat_id'
});

module.exports = { Cat, User, Clicks }
