'use strict';
const { Model, DataTypes } = require('sequelize');

// Course schema defined that has belongs to association with the user model
module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A title is required'
          },
          notEmpty: {
            msg: 'Please provide a title'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A description is required'
          },
          notEmpty: {
            msg: 'Please provide a description'
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },      
    }, { sequelize });
  
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: 'userId'
        });
    };
  
    return Course;
  };