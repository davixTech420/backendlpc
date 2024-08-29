const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Cliente = sequelize.define("Cliente", {
    nacionCliente: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true,
      references: {
        model: User,
        key:'id',
        foreignKey:'userId'
      },
    },
  });

  module.exports = Cliente;
  