const db = require("../database/models");
const { body, check } = require("express-validator");

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("Debes escribir un email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un email válido"),

  body("email").custom((value) => {
    return db.User.findOne({ where: { email: value } }).then((user) => {
      if (user) {
        return Promise.reject("El email ya está registrado");
      }
    });
  }),

  check("password")
    .notEmpty()
    .withMessage("Debes escribir tu contraseña")
    .isLength({
      min: 8,
    })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres"),

  check("name")
    .notEmpty()
    .withMessage("Debés ingresar tu nombre")
    .not()
    .isNumeric()
    .withMessage("Nombre tiene que ser una cadena de texto")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Nombre debe tener más de 3 caracteres"),
];
