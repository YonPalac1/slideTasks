module.exports = function (sequelize, dataTypes) {
  let alias = "Subtask";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(100),
    },
    tasks_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
  };
  let config = {
    tableName: "Subtasks",
    timestamps: false,
  };
  let Subtask = sequelize.define(alias, cols, config)

  Subtask.associate = (models) => {
    Subtask.belongsTo(models.Task, {
      as: "tasks",
      foreignKey: "tasks_id",
    })
  };

  return Subtask;
};
