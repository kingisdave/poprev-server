const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    totalInvestment: {
      type: DataTypes.INTEGER,
      default: 0
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      default: 0
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
