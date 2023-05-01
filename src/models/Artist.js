const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stageName: {
      type: DataTypes.STRING,
      unique: true
    },
    projectCount: {
      type: DataTypes.INTEGER,
      default: 0
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      default: 0
    }
  },{
    associate: function (models) {
      Artist.belongsTo(models.User, {
        onDelete: 'CASCADE',
      });
    }
  });
  
  return Artist;
}
