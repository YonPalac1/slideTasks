module.exports = (sequelize, dataTypes) => {
    let alias = "Columns";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(100)
        },
        projects_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
    }
    
    let config = {
        tableName: "columns",
        timestamps: false
    }

    const Columns = sequelize.define(alias, cols, config)

    Columns.associate = models => {
        Columns.belongsTo(models.Projects, {
            as: "projects",
            foreignKey: "projects_id"
        }),
        Columns.hasMany(models.Task, {
            as: "tasks",
            foreignKey: "columns_id"
        })
    }

    return Columns;
}