const db = require("../database/models");
const Op = db.Sequelize.Op;

module.exports = {
  getAllProject: (req, res) => {
    db.Projects.findAll({
      where: {
        users_id: req.params.id,
      },
      include: [
        {
          association: "columns",
        },
      ],
    }).then((projects) => {
      return res.status(200).json({
        ok: true,
        data: projects,
      });
    });
  },
  getOneProject: (req, res) => {
    db.Projects.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "columns",
        },
      ],
    }).then((project) => {
      return res.status(200).json({
        ok: true,
        data: project,
      });
    });
  },
  createProject: (req, res) => {
    const { name } = req.body;
    db.Projects.create({
      name,
      users_id: req.params.id
    }).then((project) => {
      db.Columns.create({
        name: "Backlog",
        projects_id: project.id
      })
      res.status(200).json({
        data: project,
        meta: {
          ok: true,
          status: 200,
          msg: "Projecto creado con exito",
        },
        errors: null,
      });
    });
  },
  updateProject: (req, res) => {
    const { name } = req.body;
    db.Projects.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((project) => {
      res.status(200).json({
        data: project,
        meta: {
          ok: true,
          status: 200,
          msg: "Projecto editado con exito",
        },
        errors: null,
      });
    });
  },
  deleteProject: (req, res) => {
    db.Projects.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (result) {
        return res.status(200).json({
          msg: "Projecto eliminado exitosamente",
        });
      } else {
        return res.status(200).json({
          msg: "Sin cambios",
        });
      }
    });
  },
};
