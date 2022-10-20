const { Diet } = require("../db")

//METODO=> getALLDIET
const getAllDiet=async()=>{
    return await Diet.findAll();
}

module.exports={
    getAllDiet,
}