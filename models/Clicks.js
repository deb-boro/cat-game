const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class Clicks extends Model {}

Clicks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    cat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cat',
        key: 'id',
      },
    },
    // click_count: {
    //   type: DataTypes.INTEGER,
    // },
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
