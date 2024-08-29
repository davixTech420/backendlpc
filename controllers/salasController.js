const Salas = require("../models/Salas");
const JefeSala = require("../models/JefeSala");
const { Op } = require("sequelize");


exports.getSalas = async (req, res) => {
    try{
    const salas = await Salas.findAll();
    res.status(201).json(salas);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getSalasId = async (req, res) => {
    try{
const { id } = req.params;
    const salas = await Salas.findByPk(id);
    res.status(201).json(salas);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};






exports.getSalasConJefe = async (req, res) => {
    try {
      // Obtener un array de IDs de salas que tienen un jefe asignado
      const salasConJefe = await JefeSala.findAll({
        attributes: ['salaId'],
        raw: true, // Devuelve solo los datos, no las instancias completas
      });
  
      // Extraer solo los IDs de las salas
      const salaIdsConJefe = salasConJefe.map(sala => sala.salaId);
  
      // Buscar salas que estén en el array de IDs con jefe asignado
      const salasConJefeAsignado = await Salas.findAll({
        where: {
          id: {
            [Op.in]: salaIdsConJefe.length > 0 ? salaIdsConJefe : [0], // Si no hay IDs, pasar un array que no filtre nada
          },
        },
      });
  
      res.status(201).json(salasConJefeAsignado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };






exports.getSalasSinJefe = async (req, res) => {
        try {
            // Obtener un array de IDs de salas que tienen un jefe asignado
            const salasConJefe = await JefeSala.findAll({
              attributes: ['salaId'],
              raw: true, // Devuelve solo los datos, no las instancias completas
            });
        
            // Extraer solo los IDs de las salas
            const salaIdsConJefe = salasConJefe.map(sala => sala.salaId);
        
            // Buscar salas que no estén en el array de IDs con jefe asignado
            const salasSinJefe = await Salas.findAll({
              where: {
                id: {
                  [Op.notIn]: salaIdsConJefe.length > 0 ? salaIdsConJefe : [0], // Si no hay IDs, pasar un array que no filtre nada
                },
              },
            });
        
            res.status(201).json(salasSinJefe);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
}





exports.updateSala = async (req, res) => {
    try{
        const { id } = req.params;
        const { imagen,nombre,direccion,capacidad,estado } = req.body;
        const salaActualizada = await Salas.update({imagen,nombre,direccion,capacidad,estado}, { where: { id: id } });

        if (salaActualizada[0] === 0) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.status(201).json({ message: 'Sala actualizada exitosamente' });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.crearSala = async (req,res) => {
    const {imagen,nombre,direccion,capacidad,estado} = req.body;

    try{
    const nuevaSala = Salas.create({
        imagen,
        nombre,
        direccion,
        capacidad,
        estado
    });
    res.status(201).json({
        message: "Sala creada exitosamente",
    });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
exports.eliminarSala = async (req, res) => {
    try{
        const eliminar = Salas.destroy({ where: { id: req.params.id } })
        if (eliminar == 0){
            return res.status(404).json({ message: 'Sala no encontrado' });
        }
        res.status(204).send();


    } catch(error){
        res.status(500).json({error})
    }

}