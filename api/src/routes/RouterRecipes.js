const Router=require("express");
const { getAllRecipes, getAllRecipesByName, getRecipeById, postNewRecipe}=require("../controllers/controllerRecipe.js");


const router=Router();

router.get("/", async(req,res)=>{
    try{
        const {name}=req.query;
        if(name){
            return res.status(200).json(await getAllRecipesByName(name));
        }else{
            return res.status(200).json(await getAllRecipes());
        }
    }catch(error){
        return res.status(404).send(error.message);
    }
    
});


router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        return res.status(200).json(await getRecipeById(id));
    }catch(error){
        return res.status(404).send(error.message);
    }
})


//ruta de crear new Recipe
router.post("/",async(req,res)=>{
    try{
        const {name,summary,healthScore,step,image,diet,dishType}=req.body;
        return res.status(202).json(await postNewRecipe(name,summary,healthScore,step,image,diet,dishType));
    }catch(error){
        return res.status(400).send(error.message);
    }
})



module.exports=router;