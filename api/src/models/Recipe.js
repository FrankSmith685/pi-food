const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    healthScore:{
      type:DataTypes.INTEGER,
      defaultValue:1,
      validate:{
        min:1,
        max:100
      }
    },
    step:{
      type:DataTypes.STRING,
      allowNull:true
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    dishType:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    }
  },{timestamps:false});
};
