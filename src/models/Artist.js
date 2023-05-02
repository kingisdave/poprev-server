module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
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
      unique: true
    },
    projectCount: {
      type: DataTypes.INTEGER,
      default: 0
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
