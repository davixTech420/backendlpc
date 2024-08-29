const express = require("express");
const router = express.Router();
const mensajeController = require("../controllers/mensajeController");
const showController = require("../controllers/showController");
const jefeSalaController = require("../controllers/jefeSalaController");


router.get("/jefe/:salaId", jefeSalaController.getJefeId);
router.post("/mensaje",mensajeController.crearMensaje);
router.get("/mensaje/:emisorId",mensajeController.getDistinctReceiversBySender);
router.get("/mensaje/:emisorId/:receptorId",mensajeController.getConversacion);



router.get("/jefeShowId/:id",jefeSalaController.getJefeShowId);
router.get("/showsMiSala/:id",showController.getShowsSala);


module.exports = router;