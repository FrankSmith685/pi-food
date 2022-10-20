import axios from "axios";

export const GET_ALL_RECIPES="GET_ALL_RECIPES";
export const GET_ALL_RECIPE_BY_NAME="GET_ALL_RECIPE_BY_NAME";
export const GET_ALL_RECIPE_BY_DIET="GET_ALL_RECIPE_BY_DIET";
export const GET_ALL_DIETS="GET_ALL_DIETS";
export const GET_ALL_RECIPE_EXISTENT_AND_CREATED="GET_ALL_RECIPE_EXISTENT_AND_CREATED";
export const GET_ORDER_BY_RECIPE="GET_ORDER_BY_RECIPE";
export const GET_ORDER_BY_HEALTHSCORE="GET_ORDER_BY_HEALTHSCORE";
export const GET_DETAIL_RECIPES="GET_DETAIL_RECIPES";
export const POST_RECIPES="POST_RECIPES";
export const LIMPIE_DETALLE="LIMPIE_DETALLE";

//METODO=> TRAER TODOS LOS RECIPES
export  const getAllRecipe=()=>{
    return async(dispatch)=>{
        const json=await axios.get("http://localhost:3001/recipes/");
        return dispatch({
            type:GET_ALL_RECIPES,
            payload:json.data
        })
    }
}

//METODO=>TRAER TODOS LOS RECIPES POR NAME
export const getAllRecipeByName=(name)=>{
    return (dispatch)=>{
        
        axios.get(`http://localhost:3001/recipes/?name=${name}`)
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

//METODO=> FILTRAR TODOS LOS RECIPES POR DIET
export const getAllRecipeByDiets=(payload)=>{
    return{
        type:GET_ALL_RECIPE_BY_DIET,
        payload
    }
}

//METODO=> FILTRAR TODAS LAS DIETAS
export const getAllDiets=()=>{
    return async(dispatch)=>{
        const json=await axios.get("http://localhost:3001/diets/");
            return dispatch({
                type:GET_ALL_DIETS,
                payload:json.data
            })
    }
}

//METODO=> FILTRAR POR CREATED Y EXISTENT
export const getAllRecipeexistandCreated=(payload)=>{
    return{
        type:GET_ALL_RECIPE_EXISTENT_AND_CREATED,
        payload
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

//METODO=> MOSTRAR EL DETALLE DE CADA RECIPE
export const getDetailRecipe=(id)=>{
    try{
        return async(dispatch)=>{
            var json=await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type:GET_DETAIL_RECIPES,
                payload:json.data
            })
        }
    }catch(error){
        console.log(error);
    }
}

//METODO => CREAR UN NUEVO RECIPE
export const postRecipe=(payload)=>{
    return async(dispatch)=>{
        await axios.post("http://localhost:3001/recipes/",payload)
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

export const limpieDetalle=(payload)=>{
    return{
        type:LIMPIE_DETALLE,
        payload
    }
}