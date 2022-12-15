const axios=require("axios");
const { Op } = require("sequelize");
const {Recipe, Diet, API_KEY} = require("../db.js");

//URL DE LA API
const apiurl=`https://ba56989b-cf8f-4f20-9e41-a3423b2d8ac4.mock.pstmn.io/foods`;
//DATOS DE LA API
const getDataApis=async()=>{
    const getApi=await axios.get(apiurl);
    const getApiInfo=await getApi.data.results.map((recipes)=>{
        //STEP
        var newStep=[];
        recipes.analyzedInstructions.forEach((step)=>{
            newStep=step.steps.map((steps)=>{
                return steps.step;
            })
        })
        return {
            id:recipes.id,
            name:recipes.title,
            summary:recipes.summary,
            healthScore:recipes.healthScore,
            step:newStep.join("</br>"),
            image:recipes.image,
            diet:recipes.diets,
            dishType:recipes.dishTypes

        }
    });
    return getApiInfo
}

const getDataDB=async()=>{
    const dataDB=await Recipe.findAll({
        include:{
            model:Diet,
            attributes:['name'],
            through:{
                attributes:[],

            }
        }
    });
   let response=await dataDB?.map((recipe)=>{
    return {
        id:recipe.id,
        name:recipe.name,
        summary:recipe.summary,
        healthScore:recipe.healthScore,
        step:recipe.step,
        image:recipe.image,
        diet:recipe.diets?.map(diet=>diet.name),
        dishType:recipe.dishType 
    }
   });
   return response;
}

//CONVINAMOS LOS DATOS DE LA API Y DE LA DB
//METODO=>GETALLRECIPES
const getAllRecipes=async()=>{
    const getAPI=await getDataApis();
    const getDB=await getDataDB();
    return [...getAPI,...getDB];
}

//METODO => GETALLRECIPESBYNAME
const getAllRecipesByName=async(name)=>{
    const allrecipes=await getAllRecipes();
    const recipesByName= allrecipes.filter((recipe)=>{
        if(recipe.name.toLowerCase().trim().includes(name.toLowerCase().trim())){
            return recipe;
        }
    });
    if(recipesByName<=0){
        throw new Error("Error : No existe Recipe")
    }else{
        return recipesByName;
    }
}



//METODO=> GETRECIPEBYID
const getRecipeById=async(id)=>{
    const allRecipes=await getAllRecipes();
    const recipeByid=await allRecipes.find((recipe)=>{
        if(recipe.id==id){
            return recipe;
        }
    });
    if(!recipeByid){
        throw new Error("Error: No existe detalle de Recipe");
    }else{
        return recipeByid;
    }
}

//METODO => POSTNEWRECIPE
const postNewRecipe=async(name,summary,healthScore,step,image,diet,dishType)=>{
    const allRecipe=await getAllRecipes();
    if(allRecipe.some((recipe)=>recipe.name===name)){
        throw new Error("Ya existe recipe");
    }else if(!name || !summary || !healthScore || !step  || !diet || !dishType){
        throw new Error("Error: Debe completar el campo");
    }else{
            var recipe=await Recipe.create({
                name:name,
                summary:summary,
                healthScore:healthScore,
                step:step,
                image:image?image:"https://media.istockphoto.com/vectors/recipe-book-hand-drawn-cover-vector-illustration-vector-id1185879263?k=20&m=1185879263&s=612x612&w=0&h=Qiw3sY0LiWG4IIKcKQI9fAwAxR81xLmbhRpYpgt3S8I=",
                dishType:dishType
            });
            //Traemos las diets por name
         const diets=await Diet.findAll({
            where:{
                name:diet
            }
        });
        // console.log(diets);
        recipe.addDiets(diets);
        return "Se agregó correctamente";
    }
}




module.exports={
    getAllRecipes,
    getAllRecipesByName,
    getRecipeById,
    postNewRecipe

}