const { doubledUuid } = require('../utils/commonUuids')

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: doubledUuid,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    artistId:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectValue: {
      type: DataTypes.STRING,
      defaultValue: "0.00"
    },
    approvalStatus: {
      type: DataTypes.STRING,
      defaultValue: "DECLINED"
    },
    contributorsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    amountGenerated: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    investmentStatus: {
      type: DataTypes.STRING,
      defaultValue: "CLOSED"
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
