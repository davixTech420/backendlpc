const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) =>
  res.json({ message: "Bienvenido, admin!" })
);

 router.get("/tabla/:tableId", (req, res) => {
  const { tableId } = req.params;
  router.query("SELECT * FROM " + tableId, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }
    res.json({
      columns: Object.keys(results[0]), // Obtener los nombres de las columnas
      rows: results,
    });
  });
});
 
module.exports = router;
