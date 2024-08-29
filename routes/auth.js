// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const salaController = require("../controllers/salasController");
const showsController = require("../controllers/showController");
const jefeSalaController = require("../controllers/jefeSalaController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/teatros",salaController.getSalasConJefe);
router.get("/shows",showsController.getShowsActivos);

router.get("/salas/:id",salaController.getSalasId);
router.get("/jefe/:salaId", jefeSalaController.getJefeId);

module.exports = router;



