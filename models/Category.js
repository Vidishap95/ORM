const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      // set the data type to integer
      type: DataTypes.INTEGER,
      //disallow null values
      allowNull: false,
      //set as primary key
      primaryKey: true,
      //increment the value for each new record
      autoIncrement: true,
    },
    // defining 'category_name' column
    category_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
