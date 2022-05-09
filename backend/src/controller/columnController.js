const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
  getAllColumn: (req, res) => {
    db.Columns.findAll({
      where: {
        projects_id: req.params.id,
      },
      include: [
        {
          association: "tasks",
        },
        {
          association: "projects",
        },
      ],
    }).then((columns) => {
      return res.status(200).json({
        ok: true,
        data: columns,
      });
    });
  },
  createColumn: (req, res) => {
    db.Columns.create({
      name: "New column",
      projects_id: req.params.id
    }).then((column) => {
      res.status(200).json({
        data: column,
        meta: {
          ok: true,
          status: 200,
          msg: "Columna creado con exito",
        },
        errors: null,
      });
    });
  },
  updateColumn: (req, res) => {
    const { name } = req.body;
    db.Columns.update(
      {
        name,
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
          msg: "Columna editado con exito",
        },
        errors: null,
      });
    });
  },
  deleteColumn: (req, res) => {
    db.Columns.destroy({
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
