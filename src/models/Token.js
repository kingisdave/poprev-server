const bcrypt = require('bcrypt')
const { doubledUuid, generateToken } = require('../utils/commonUuids')

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.UUID,
      defaultValue: doubledUuid,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    maintoken: {
      type: DataTypes.TEXT,
      defaultValue: generateToken,
      allowNull: false
    },
    projectId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "NULL"
    },
    tokenValue: {
      type: DataTypes.STRING,
      defaultValue: "0.00"
    },
    amountAcquired: {
      type: DataTypes.STRING,
      defaultValue: "0.00"
    },
    percentAcquired: {
      type: DataTypes.STRING,
      defaultValue: "0.00"
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
      beforeCreate: async (token) => {
        if (token.maintoken) {
          const salt = await bcrypt.genSalt(10);
          token.maintoken = await bcrypt.hash(token.maintoken, salt);
        }
      },
      beforeUpdate:async (token) => {
        if (token.maintoken) {
          const salt = await bcrypt.genSalt(10);
          token.maintoken = await bcrypt.hash(token.maintoken, salt);
        }
      }
    }
  });
  
  Token.prototype.validToken = async function (token) {
    return await bcrypt.compare(token, this.maintoken);
  };

  Token.prototype.updateAndCalculateTotal = async function (payment) {
    // Perform calculations
    const total = parseFloat(this.tokenValue) - parseInt(payment);

    // Update the instance properties
    this.amountAcquired = total.toFixed(2);
    this.percentAcquired = ((total / parseFloat(this.tokenValue)) * 100).toFixed(2);
    this.payment = payment;

    // Save the updated instance
    return this.save();
  }
  
  return Token;
}
