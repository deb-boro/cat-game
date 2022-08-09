const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class Cat extends Model {
  static click(body, models) {
    return models.Clicks.create({
      user_id: body.user_id,
      cat_id: body.cat_id
    }).then(() => {
      return Cat.findOne({
        where: {
          id: body.cat_id
        },
        attributes: [
          'id',
          'name',
          'color',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = clicks.post_id)'), 'click_count']
        ],
      });
    });
  }
}

Cat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cat',
  },
)

module.exports = Cat
