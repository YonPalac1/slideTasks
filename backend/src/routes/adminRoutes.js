const express = require("express");
const router = express.Router();
const apiController = require("../controller/apiController.js");
const projectController = require("../controller/projectController.js");
const columnsController = require("../controller/columnController.js");

// CRUD TASKS
router.get("/get/task/", apiController.getAllTasks);
router.post("/create/task/:id", apiController.createTasks);
router.put("/update/task/:id", apiController.updateTask);
router.delete("/delete/task/:id", apiController.deleteTask);

// CRUD PROJECT
router.get("/get/projects/:id", projectController.getAllProject);
router.get("/get/project/:id", projectController.getOneProject);
router.post("/create/project/:id", projectController.createProject);
router.put("/update/project/:id", projectController.updateProject);
router.delete("/delete/project/:id", projectController.deleteProject);

// CRUD COLUMNS
router.get("/get/columns/:id", columnsController.getAllColumn);
router.post("/create/columns/:id", columnsController.createColumn);
router.put("/update/columns/:id", columnsController.updateColumn);
router.delete("/delete/columns/:id", columnsController.deleteColumn);

module.exports = router;
