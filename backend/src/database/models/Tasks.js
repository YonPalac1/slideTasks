module.exports = (sequelize, dataTypes) => {
  let alias = "Task";
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
    description: {
      type: dataTypes.INTEGER(11),
      allowNull: true,
    },
    priority: {
      type: dataTypes.INTEGER(11).UNSIGNED,
    },
    end_day: {
      type: dataTypes.DATEONLY,
      allowNull: true,
    },
    start_day: {
      type: dataTypes.DATEONLY,
      allowNull: true,
    },
    columns_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
  };
  let config = {
    tableName: "Tasks",
    timestamps: false,
  };

  const Task = sequelize.define(alias, cols, config);

  Task.associate = (models) => {
    Task.belongsTo(models.Columns, {
      as: "columns",
      foreignKey: "columns_id",
    }),
    Task.hasMany(models.Subtask, {
      as: "subtasks",
      foreignKey: "tasks_id"
    })
  };

  return Task;
};
