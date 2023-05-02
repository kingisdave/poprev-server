module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    approvalStatus: {
      type: DataTypes.STRING,
      default: "DECLINED"
    },
    contributorsCount: {
      type: DataTypes.INTEGER,
      default: 0
    },
    amountGenerated: {
      type: DataTypes.DOUBLE,
      default: 0
    },
    investmentStatus: {
      type: DataTypes.INTEGER,
      default: 0
    },
  },{
    associate: function (models) {
      Project.belongsTo(models.Artist, {
        onDelete: 'CASCADE'
      });
      Project.hasMany(models.Token, {
        onDelete: 'CASCADE'
      });
    }
  });
  
  
  return Project;
}
