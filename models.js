const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Pun extends Model {}
Pun.init(
  {
    punID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    punchline: DataTypes.STRING(140)
  },
  {
    sequelize, modelName: 'pun'
  }
);

module.exports =  Pun;