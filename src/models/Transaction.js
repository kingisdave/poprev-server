
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      default: "FAILED"
    }
  },{
    associate: function (models) {
      Transaction.belongsTo(models.User, {
        onDelete: 'CASCADE',
        hooks: true
      });
      Transaction.belongsTo(models.Token, {
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
  
  // Transaction.prototype.validPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };
  
  return Transaction;
}
