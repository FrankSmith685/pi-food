const Router=require("express");
const { getAllDiet } = require("../controllers/controllerDiet");

const router=Router();

//Ruta de diet
router.get("/",async(req,res)=>{
    try{
        return res.status(200).json(await getAllDiet());
    }catch(error){
        return res.status(404).send(error.message);
    }
})


module.exports=router;