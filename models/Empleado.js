const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Empleado = sequelize.define("Empleado", {
    nombre: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        unique:true,
        references: {
            model: User,
            key:'id',
            foreignKey:'userId'
        },
    },
});

module.exports = Empleado;