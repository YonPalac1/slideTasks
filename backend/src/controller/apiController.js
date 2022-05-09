const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
  getAllTasks: (req, res) => {
    db.Task.findAll({
      include: [
        {
          association: "columns",
        },
      ],
    }).then((tasks) => {
      return res.status(200).json({
        ok: true,
        data: tasks,
      });
    });
  },
  createTasks: (req, res) => {
    const { name, description, priority, end_day, start_day } = req.body;
    db.Task.create({
      name,
      description,
      priority: 1,
      end_day,
      start_day,
      columns_id: req.params.id,
    }).then((task) => {
      res.status(200).json({
        data: task,
        meta: {
          ok: true,
          status: 200,
          msg: "tarea creado con exito",
        },
        errors: null,
      });
    });
  },
  updateTask: (req, res) => {
    const { name, description, priority, end_day, start_day } = req.body;
    db.Task.update(
      {
        name,
        description,
        priority: 1,
        end_day,
        start_day,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    ).then((column) => {
      res.status(200).json({
        data: column,
        meta: {
          ok: true,
          status: 200,
          msg: "Tarea editado con exito",
        },
        errors: null,
      });
    });
  },
  deleteTask: (req, res) => {
    db.Task.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (result) {
        return res.status(200).json({
          msg: "Columna eliminada exitosamente",
        });
      } else {
        return res.status(200).json({
          msg: "Sin cambios",
        });
      }
    });
  },
};
