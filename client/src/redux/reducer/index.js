import { GET_ALL_DIETS,GET_ALL_RECIPES, GET_ALL_RECIPE_BY_DIET, GET_ALL_RECIPE_BY_NAME, GET_ALL_RECIPE_EXISTENT_AND_CREATED, GET_DETAIL_RECIPES, GET_ORDER_BY_HEALTHSCORE, GET_ORDER_BY_RECIPE, LIMPIEDETALLE, LOADING, POST_RECIPES,  } from "../actions"

const initialState={
    recipes:[],
    recipeAll:[],
    recipeExist:[],
    diets:[],
    loading:true,
    detailRecipe:[]
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes:action.payload,
                recipeAll:action.payload,
                recipeExist:action.payload,
                loading:false,
            }

        case GET_ALL_DIETS:
            return{
                ...state,
                diets:action.payload
            }
        case GET_ALL_RECIPE_BY_NAME:
            return{
                ...state,
                recipes:action.payload,
                pagina:1
            }
        

        //METODO=>GET_ORDER_BY_HEALTHSCORE
        case GET_ORDER_BY_HEALTHSCORE:
            if(action.payload==="ascHealthScore"){
                const ascHealthScore=state.recipes.sort((a,b)=>
                a.healthScore-b.healthScore);
                return{
                    ...state,
                    recipes:ascHealthScore
                }
            }else if(action.payload==="descHealthScore"){
                const descHealthScore=state.recipes.sort((a,b)=>
                b.healthScore-a.healthScore);
                return{
                    ...state,
                    recipes:descHealthScore
                }
            }else{
                return{
                    ...state,
                    recipes:state.recipes
                }
            }
        
        case GET_ORDER_BY_RECIPE:
            var order_by_recipe=state.recipes;
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
                    recipes:ascRecipe,
                    
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
                    recipes:descRecipe
                }
            }
            else{ 
                
                return{
                    ...state,
                    recipes:state.recipes
                }
            }
        
        //METODO => GET_ALL_RECIPE_BY_DIET
        case GET_ALL_RECIPE_BY_DIET:
            
            const filteredRecipes = state.recipeAll.filter(recipe => !action.payload.some(d => !recipe.diet.includes(d)))
            
            return {
                ...state,
                recipes:filteredRecipes

            }
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
                    recipes:b
                   }
            }
            else if(action.payload==="existing"){
                return{
                    ...state,
                    recipes:a,
                }
            }
            else{
                return{
                    ...state,
                    recipes:a.concat(b)
                }
            }
       //METODO => GET_DETAIL_RECIPES
       case GET_DETAIL_RECIPES:
        
            return{
                ...state,
                detailRecipe:action.payload,
                loading:false
            }
        
        

        case LIMPIEDETALLE:
            const detalleLimpio=[];
            return{
                ...state,
                detailRecipe:detalleLimpio,
                loading:true
            }
        
        case LOADING:
            return{
                ...state,
                loading:action.payload
            }
        //METODO => POST_RECIPES
        case POST_RECIPES:
            return{
                ...state
            }
        default:
            return{
                ...state,
            }
    }
}