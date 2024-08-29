const Salas = require("../models/Salas");
const User = require("../models/User");
const Shows = require("../models/Shows");





exports.getShows = async (req,res) => {
    try{
        const shows = await Shows.findAll();
        res.status(201).json(shows);
    }catch(error){
        res.status(500).json({
            message:"Ha Ocurrido Un Error Al Obtener Los Shows"+error
        });
    }   
}


exports.getShowsActivos = async (req,res) => {
    try{
        const shows = await Shows.findAll({
            where: {estado: true}
        });
        res.status(201).json(shows);
    }catch(error){
        res.status(500).json({
            message:"Ha Ocurrido Un Error Al Obtener Los Shows"+error
        });
    }   
}


exports.crearShow = async (req,res) => {
    const {imagen,nombre,cuposDisponibles,fechaPresentar,horaInicio,horaFin,estado,salaId  } = req.body;
try{
    const resShow = Shows.create({
        imagen,
        nombre,
        cuposDisponibles,
        fechaPresentar,
        horaInicio,
        horaFin,
        estado,
        salaId,
    });
    res.status(201).json({
        message:"Show Creado Exitosamente"
    });
}catch(error){
   res.status(500).json({ 
    message:"Ha Ocurrido un error al creaar el show "
   }) 
}
}

exports.eliminarShow = async (req,res) => {
    try{
        const eliShow = await Shows.destroy({  
            where:{
                id: req.params.id}
        });

        res.status(200).json({
            message:"Se Ha Eliminado Exitosamente El Show"
        });
        
    }catch(error) {
        res.status(501).json({
            message:"Ha Ocurrido Un Error Al Eliminar El Show"
        });
    }
}


exports.getShowsSala = async (req,res) => {
    try{
    const miShows = await Shows.findAll({
      where: { salaId: req.params.id }
    })
    res.status(201).json(miShows);
    }catch(error){
    res.status(500).json({error})
    }
    }
    