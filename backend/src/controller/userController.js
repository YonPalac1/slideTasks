const db = require("../database/models");
const { hash } = require("bcrypt"); 
const { validationResult } = require("express-validator");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  getUser: async (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "projects",
        },
      ],
    }).then((user) => {
      return res.status(200).json({
        ok: true,
        data: user,
      });
    });
  },

  register: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, name, password } = req.body;
      db.User.create({
        email,
        name,
        password: await hash(password, 10),
      })
      .then(user => {
        res.status(200).json({
           data: user,
           meta: {
             ok: true,
             status: 200,
             msg: "Usuario creado con exito",
           },
           errors:null
         });
      })

    } else {
      const errorsObj = errors.mapped();
      for (key in errorsObj) {
        delete errorsObj[key].param;
        delete errorsObj[key].location;
      }

      return res.status(404).json({
        meta: {
          ok: false,
          status: 404,
          msg: "El registro no se realizo",
        },
        data: null,
        errors:errorsObj
      });
    }
  },
  login: async (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        const { email } = req.body;
        const user = await db.User.findOne({
          where:{
            email: email} 
        });

        return res.status(200).json({
          meta: {
            status: 200,
            ok: true,
          },
          data: user,
          errors: null
        });
      } catch (error) {
        res.status(404).json({
          meta: {
            status: 404,
            ok: false,
            msg: error.message,
          },
        });
      }
    } else {
      const errorsObj = errors.mapped();

      for (key in errorsObj) {
        delete errorsObj[key].param;
        delete errorsObj[key].location;
      }
      res.status(200).json({
        meta: {
          status: 200,
          ok: false,
        },
        data: null,
        errors:errorsObj
      });
    }
  },
  editUser: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, name, lastname, password } = req.body;
      
      db.User.update({
        email,
        name,
        lastname,
        password: await hash(password, 10),
        rol: 1,
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(user => {
        console.log(user)
        res.status(200).json({
           data: user,
           meta: {
             ok: true,
             status: 200,
             msg: "Usuario editado con exito",
           },
           errors:null
         });
      })

    } else {
      const errorsObj = errors.mapped();
      for (key in errorsObj) {
        delete errorsObj[key].param;
        delete errorsObj[key].location;
      }

      return res.status(200).json({
        meta: {
          ok: false,
          status: 200,
          msg: "la edicion no se realizo",
        },
        data: null,
        errors:errorsObj
      });
    }
  },
  deleteUser: (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then(result => {
        if(result){
            return res.status(200).json({
                msg: "Usuario eliminado exitosamente"
            })
        } else {
            return res.status(200).json({
                msg: "Sin cambios"
            })
        }
    })
  },
};
