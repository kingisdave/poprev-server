const { shortenedUuid } = require('../utils/common')

module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: shortenedUuid,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    projectCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },{
    associate: function (models) {
      Artist.belongsTo(models.User, {
        onDelete: 'CASCADE',
        constraints: false
      });
      Artist.hasMany(models.Project);
    }
  });
  
  return Artist;
}
