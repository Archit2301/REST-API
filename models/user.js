'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// User model defined that has many association with the course model
module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'  
        },
        notEmpty: {
          msg: 'Please provide a first name'  
        }   
      }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Last name is required'  
          },
          notEmpty: {
            msg: 'Please provide a last name'  
          }   
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email address you entered already exists'  
        },
        validate: {
          notNull: {
            msg: 'An email address is required'  
          },
          notEmpty: {
            msg: 'Please provide an email address'  
          }   
        }  
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);  
        },
        validate: {
          notNull: {
            msg: 'A password is required'  
          },
          notEmpty: {
            msg: 'Please provide a password'  
          }  
        }  
      }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'userId'  
    });  
  };

  return User;
};