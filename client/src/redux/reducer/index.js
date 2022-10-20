import { GET_ALL_DIETS, GET_ALL_RECIPES, GET_ALL_RECIPE_BY_DIET, GET_ALL_RECIPE_BY_NAME, GET_ALL_RECIPE_EXISTENT_AND_CREATED, GET_DETAIL_RECIPES, GET_ORDER_BY_HEALTHSCORE, GET_ORDER_BY_RECIPE, LIMPIE_DETALLE, POST_RECIPES } from "../action"

const initialState={
    recipe:[],
    recipeAll:[],
    recipeExist:[],
    diet:[],
    detailRecipe:[]
}

export const rootReducer=(state=initialState,action)=>{
    switch (action.type) {
        //METODO => GET_ALL_RECIPES
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipe:action.payload,
                recipeAll:action.payload,
                recipeExist:action.payload
            }
        //METODO => GET_ALL_RECIPE_BY_NAME
        case GET_ALL_RECIPE_BY_NAME:
            return{
                ...state,
                recipe:action.payload,
            }
        //METODO => GET_ALL_RECIPE_BY_DIET
        case GET_ALL_RECIPE_BY_DIET:
            const allRecipe=state.recipeAll;
            const newRecipe=[];
            allRecipe.map((recipe)=>recipe.diet.forEach((diet)=>{
                if(action.payload===diet){
                    return newRecipe.push(recipe);
                }
            }));
            if(action.payload==="AllDiets"){
                return{
                    ...state,
                    recipe:allRecipe,
                    recipeExist:allRecipe
                }
            }else{
                return{
                    ...state,
                    recipe:newRecipe,
                    recipeExist:newRecipe
                }
            }
        //METODO => GET_ALL_DIETS
        case GET_ALL_DIETS:
            return{
                ...state,
                diet:action.payload
            }
        //METODO => GET_ALL_RECIPE_EXISTENT_AND_CREATED
        case GET_ALL_RECIPE_EXISTENT_AND_CREATED:
            const getAllRecipes=state.recipeAll; //Me trae todo 
            const recipeExistent=state.recipeExist; //ME trae todo pero se modifica siempre
            const a=[];
            const b=[];

            for(let i=0;i<getAllRecipes.length;i++){
                if(typeof getAllRecipes[i].id==="number"){
                    for(let x=0;x<recipeExistent.length;x++){
                        if(getAllRecipes[i]['name']===recipeExistent[x]['name']){
                            a.push(getAllRecipes[i]);
                        }
                    }
                }else{
                    for(let x=0;x<recipeExistent.length;x++){
                        if(getAllRecipes[i]['name']===recipeExistent[x]['name']){
                            b.push(getAllRecipes[i]);
                        }
                    }
                }
            }
            if(action.payload==="created"){
                return{
                    ...state,
                    recipe:b
                   }
            }
            else if(action.payload==="existing"){
                return{
                    ...state,
                    recipe:a,
                }
            }
            else{
                return{
                    ...state,
                    recipe:a.concat(b)
                }
            }
        //METODO=>GET_ORDER_BY_RECIPE
        case GET_ORDER_BY_RECIPE:
            var order_by_recipe=state.recipe;
            if(action.payload==="ascRecipe"){
                const ascRecipe=order_by_recipe.sort((a,b)=>{
                    if(a.name.toLowerCase().trim()>b.name.toLowerCase().trim()){
                        return 1;
                    }else if(a.name.toLowerCase().trim()<b.name.toLowerCase().trim()){
                        return -1;
                    }else{
                        return 0;
                    }
                })
                return{
                    ...state,
                    recipe:ascRecipe,
                    
                }
            }
            else if(action.payload==="descRecipe"){
                const descRecipe=order_by_recipe.sort((a,b)=>{
                    if(a.name.toLowerCase().trim()>b.name.toLowerCase().trim()){
                        return -1;
                    }else if(a.name.toLowerCase().trim()<b.name.toLowerCase().trim()){
                        return 1;
                    }else{
                        return 0;
                    }
                })
                return{
                    ...state,
                    recipe:descRecipe
                }
            }
            else{ 
                
                return{
                    ...state,
                    recipe:state.recipe
                }
            }
        //METODO=>GET_ORDER_BY_HEALTHSCORE
        case GET_ORDER_BY_HEALTHSCORE:
            if(action.payload==="ascHealthScore"){
                const ascHealthScore=state.recipe.sort((a,b)=>
                a.healthScore-b.healthScore);
                return{
                    ...state,
                    recipe:ascHealthScore
                }
            }else if(action.payload==="descHealthScore"){
                const descHealthScore=state.recipe.sort((a,b)=>
                b.healthScore-a.healthScore);
                return{
                    ...state,
                    recipe:descHealthScore
                }
            }else{
                return{
                    ...state,
                    recipe:state.recipe
                }
            }
        //METODO => GET_DETAIL_RECIPES
        case GET_DETAIL_RECIPES:
            return{
                ...state,
                detailRecipe:action.payload
            }
        //METODO => POST_RECIPES
        case POST_RECIPES:
            return{
                ...state
            }
        case LIMPIE_DETALLE:
                const detalleLimpio=[];
            return{
                ...state,
                detailRecipe:detalleLimpio
            }

        default:
            return {
                state
            }
    }
}