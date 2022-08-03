const Cat = require('./Cat')
const User = require('./User')

User.hasMany(Cat, {
  foreignKey: 'user_id',
})

Cat.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
})

<<<<<<< HEAD
module.exports = { Cat, User };
=======
module.exports = { Cat, User }
>>>>>>> main
