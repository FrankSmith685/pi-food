const axios=require("axios");
const { Diet, API_KEY } = require("../db");
const vegetarian="vegetarian";

const apiurl=`https://ba56989b-cf8f-4f20-9e41-a3423b2d8ac4.mock.pstmn.io/foods`;
const getDataApi=async()=>{
    if(!(await Diet.findAll()).length){ //Si en la tabla Diet no existe datos
        const getApi=await axios.get(apiurl); 
        const getApiInfo=await getApi.data.results.map((diet)=>diet.diets).flat();//Unir en un solo arreglo
        const newDiet=[];
        getApiInfo.forEach((diet)=>{
            if(!newDiet.includes(diet)){
                newDiet.push(diet);
            }
        })
        //Agregamos un elemento al newDiet
        newDiet.push(vegetarian);
       
        //convertir en un arreglo de objetos
        const diets=newDiet.map((diet)=>{
            return{
                name:diet
            }
        })
        //Ordenar las diets alfabeticamente
        const orderByasc=diets.sort((a,b)=>{
            if(a.name.toLowerCase().trim()>b.name.toLowerCase().trim()){
                return 1;
            }else if(b.name.toLowerCase().trim()>a.name.toLowerCase().trim()){
                return -1;
            }else{
                return 0;
            }
        })
        //Agregar a la tabla
        await Diet.bulkCreate(orderByasc); //Agrega los datos a la tabla Diet
        console.log("Creamos las Diets");
    }else{
        console.log("Ya tengo Diets"); 
    }
}

module.exports={
    getDataApi
}