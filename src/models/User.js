const bcrypt = require('bcrypt')
const { shortenedUuid } = require('../utils/common')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    investmentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    password: DataTypes.STRING  
  },{
    associate: function (models) {
      User.hasOne(models.Artist, {
        onDelete: 'CASCADE',
        hooks: true
      });
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate:async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  return User;
}
