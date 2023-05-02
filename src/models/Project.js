module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    artist_id: DataTypes.INTEGER,
    approval_status: {
      type: DataTypes.STRING,
      default: "DECLINED"
    },
    contributors_count: {
      type: DataTypes.INTEGER,
      default: 0
    },
    amount_generated: {
      type: DataTypes.DOUBLE,
      default: 0
    },
    investment_status: {
      type: DataTypes.INTEGER,
      default: 0
    },
  },{
    associate: function (models) {
      Project.belongsTo(models.Artist, {
        onDelete: 'CASCADE'
      });
    }
  });
  
  
  return Project;
}
