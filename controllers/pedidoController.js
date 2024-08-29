const Pedidos = require("../models/Pedido");
const Shows = require("../models/Shows");
const Salas = require("../models/Salas");
const Users = require("../models/User");
const JefeSala = require("../models/JefeSala");



exports.crearPedido = async (req, res) => {
    
    const {imagen,nombre,cuposDisponibles,fechaPresentar,horaInicio,horaFin,salaId,clienteId,empleadosRequeridos  } = req.body;
    try {
        const resShow = await Shows.create({
          imagen,
          nombre,
          cuposDisponibles: parseInt(cuposDisponibles), // Convertir a número
          fechaPresentar,
          horaInicio,
          horaFin,
          estado: false,
          salaId,
          clienteId
        });
      
        const resPedi = await Pedidos.create({
          showId: resShow.id,
          salaId,
          estado: "pendiente",
          empleadosRequeridos: parseInt(empleadosRequeridos), // Convertir a número
          empleadosAsignados: 0
        });
      
        res.status(201).json({
          show: resShow,
          pedido: resPedi,
          message: "Pedido Creado Exitosamente"
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Ha ocurrido un error al crear el pedido"
        });
      }
    }

