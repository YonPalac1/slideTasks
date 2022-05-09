module.exports = function(sequelize, dataTypes){
    let alias = "Projects";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        } ,
        users_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "projects",
        timestamps: false
    }
    let Projects = sequelize.define(alias, cols, config);

    Projects.associate = function(models){
        Projects.belongsTo(models.User, {
            as: "users",
            foreignKey: "users_id"
        }),
        Projects.hasMany(models.Columns, {
            as: "columns",
            foreignKey: "projects_id"
        })
    }

    return Projects
}