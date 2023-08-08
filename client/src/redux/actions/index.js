import axios from "axios";

export const GET_ALL_DIETS="GET_ALL_DIETS";
export const GET_ALL_RECIPES="GET_ALL_RECIPES";
export const GET_ALL_RECIPE_BY_NAME="GET_ALL_RECIPE_BY_NAME";
export const LOADING="LOADING";
export const GET_ORDER_BY_HEALTHSCORE="GET_ORDER_BY_HEALTHSCORE";
export const GET_ORDER_BY_RECIPE="GET_ORDER_BY_RECIPE";
export const GET_ALL_RECIPE_BY_DIET="GET_ALL_RECIPE_BY_DIET";
export const GET_ALL_RECIPE_EXISTENT_AND_CREATED="GET_ALL_RECIPE_EXISTENT_AND_CREATED";
export const GET_DETAIL_RECIPES="GET_DETAIL_RECIPES";
export const LIMPIEDETALLE="LIMPIEDETALLE";
export const POST_RECIPES="POST_RECIPES";

const RUTA_DIET="https://pi-food-production-c212.up.railway.app/diets/" 
const RUTA_RECIPES="https://pi-food-production-c212.up.railway.app/recipes/" 
// const RUTA_DIET="http://localhost:3001/diets/"; 
// const RUTA_RECIPES="http://localhost:3001/recipes/";



export const getAllRecipes=()=>{
    return async(dispatch)=>{
        const json=await axios.get(RUTA_RECIPES);
        return dispatch({
            type:GET_ALL_RECIPES,
            payload:json.data
        })
    }
}

// Traer todas las Dietas
export const getAllDiets=()=>{
    return async(dispatch)=>{
        const json=await axios.get(RUTA_DIET);
            return dispatch({
                type:GET_ALL_DIETS,
                payload:json.data
            })
    }
}

// FILTRAR POR NAME
export const getAllRecipeByName=(name)=>{
    return (dispatch)=>{
        
        axios.get(`${RUTA_RECIPES}?name=${name}`)
        .then(res=>{
            if(!res.data.length<=0){
                return dispatch({
                    type:GET_ALL_RECIPE_BY_NAME,
                    payload:res.data
                })
            }
        }).catch(error=>{
            alert("Error");
        })
    }
}


//METODO => ORDENAR POR RECIPES
export const getOrderByRecipes=(payload)=>{
    return{
        type:GET_ORDER_BY_RECIPE,
        payload
    }
}

export const getOrderByHealthScore=(payload)=>{
    return{
        type:GET_ORDER_BY_HEALTHSCORE,
        payload
    }
}

//METODO=> FILTRAR TODOS LOS RECIPES POR DIET
export const getAllRecipeByDiets=(payload)=>{
    return{
        type:GET_ALL_RECIPE_BY_DIET,
        payload
    }
}
//METODO=> FILTRAR POR CREATED Y EXISTENT
export const getAllRecipeexistandCreated=(payload)=>{
    return{
        type:GET_ALL_RECIPE_EXISTENT_AND_CREATED,
        payload
    }
}

//METODO=> MOSTRAR EL DETALLE DE CADA RECIPE
export const getDetailRecipe=(id)=>{
    try{
        return async(dispatch)=>{
            var json=await axios.get(`${RUTA_RECIPES}${id}`);
            return dispatch({
                type:GET_DETAIL_RECIPES,
                payload:json.data
            })
        }
    }catch(error){
        console.log(error);
    }
}


// Limipiar
export function limpieDetalle(payload){
    return{
        type: LIMPIEDETALLE,
        payload
    }
}

// LOADING
export function loading(on) {
    return {
        type: LOADING,
        payload: on
    }
}

//METODO => CREAR UN NUEVO RECIPE
export const postRecipe=(payload)=>{
    return async(dispatch)=>{
        await axios.post(`${RUTA_RECIPES}`,payload)
        .then(res=>{
            return dispatch({
                type:POST_RECIPES,
                payload:res
            });
        }).catch(error=>{
            alert("Error al Crear");
        })
    }
}