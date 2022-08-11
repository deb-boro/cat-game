const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Clicks extends Model {}

Clicks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'cat',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'clicks',
  },
)

module.exports = Clicks
