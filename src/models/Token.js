// const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    maintoken: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      default: "NULL"
    },
    token_value: {
      type: DataTypes.DOUBLE,
      default: 0
    },
    amount_acquired: {
      type: DataTypes.DOUBLE,
      default: 0
    },
    percent_acquired: {
      type: DataTypes.DOUBLE,
      default: 0
    },
  },{
    associate: function (models) {
      Token.belongsTo(models.Project, {
        onDelete: 'CASCADE',
        hooks: true
      });
      Token.hasMany(models.Transaction, {
        onDelete: 'CASCADE',
        hooks: true
      });
    },
    hooks: {
      // beforeCreate: async (user) => {
      //   if (user.password) {
      //     const salt = await bcrypt.genSalt(10);
      //     user.password = await bcrypt.hash(user.password, salt);
      //   }
      // },
      // beforeUpdate:async (user) => {
      //   if (user.password) {
      //     const salt = await bcrypt.genSalt(10);
      //     user.password = await bcrypt.hash(user.password, salt);
      //   }
      // }
    }
  });
  
  // Token.prototype.validPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };
  
  return Token;
}
