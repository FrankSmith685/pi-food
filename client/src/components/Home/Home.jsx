import React, { useEffect, useState  } from "react";
import style from '../Home/Home.module.css';
import { NavBar } from "../NavBar/NavBar";
import {useDispatch, useSelector} from "react-redux";
import { getAllDiets, getAllRecipe, getAllRecipeByDiets, getAllRecipeByName, getAllRecipeexistandCreated, getOrderByHealthScore, getOrderByRecipes } from "../../redux/action";
import {Cards} from "../Cards/Cards";
import { LoaderFood } from "./LoaderFood/LoaderFood";
import { Pagination } from "../Pagination/Pagination";
import {Link} from "react-router-dom";


export const Home=()=>{
    const dispatch=useDispatch();
    const recipes=useSelector(state=>state.recipe);
    const diets=useSelector(state=>state.diet);

    //ESTADO GLOBAL
    const [state,setState]=useState({
        value:"",
        recipes:"",
        orderRecipe:"",
        orderHealthScore:"",
        currentPage:1,
        nroPaginado:9
    });
    //Validar la paginacion 
    const ultimoPage=state.currentPage===1 ? 9:state.nroPaginado*state.currentPage-1;
    const primerPage=state.currentPage===1 ? 0:ultimoPage-state.nroPaginado;
    const mainRecipe=recipes?.slice(primerPage, ultimoPage);


    useEffect(()=>{
        dispatch(getAllRecipe());
        dispatch(getAllDiets());
    },[dispatch])

    //PAGINATION
    function onClickPagination(numero){
        if(numero===1){
            setState({...state,currentPage:numero,nroPaginado:9});
        }else{
            setState({...state,currentPage:numero,nroPaginado:10});
        } 
    }
    

    //METODOS DE LOS COMPONENTES
    function onChangeReceta(ev){
        setState({...state,value:ev.target.value});
    }
    function onclickReceta(){
        dispatch(getAllRecipeByName(state.value));
        setState({...state,value:"",currentPage:1});
    }
    function onclickRefress(){
        onClickPagination(1);
        dispatch(getAllRecipe());
    }

    //METODO => componente de select
    function onChangeDiets(ev){
        dispatch(getAllRecipeByDiets(ev.target.value));
        setState({...state,recipes:"All",currentPage:1});
    }
    function onChangeRecipe(ev){
        dispatch(getAllRecipeexistandCreated(ev.target.value));
        setState({...state,recipes:ev.target.value,currentPage:1});
    }

    function onChangeOrderRecipe(ev){
        dispatch(getOrderByRecipes(ev.target.value));
        setState({...state,orderRecipe:ev.target.value,currentPage:1});
    }

    function onChangeOrderHealthScore(ev){
        dispatch(getOrderByHealthScore(ev.target.value));
        setState({...state,orderHealthScore:ev.target.value,currentPage:1});
    }



    return(
        <div>
            <div className={style.containerNavbar}>
            <NavBar 
                onChangeReceta={(ev)=>onChangeReceta(ev)}
                onclickReceta={()=>onclickReceta()}
                value={state.value}
                onclickRefress={()=>onclickRefress()}
            />
            </div>

            <div className={style.containerGeneral}>
            {recipes?.length>0?
                <div className={style.container1}>
                    {mainRecipe?.map((recipe)=>{
                        return(
                            <div key={recipe.id}>
                                <Link to={`/home/${recipe.id}`}>
                                    <Cards
                                        key={recipe.id}
                                        name={recipe.name}
                                        image={recipe.image}
                                        diet={recipe.diet?.map(c=>{
                                            return (
                                                <p key={c} className={style.dietas}>-{c}</p>
                                            )
                                        })}
                                        dishType={recipe.dishType?.map(c=>{
                                            return (
                                                <p key={c} className={style.dishType}>-{c}</p>
                                            )
                                        })}
                                    />
                                </Link>
                            </div>
                        )
                    })}
            </div>
            :<LoaderFood/>
            }
            <div className={style.container2}>
                <div className={style.subcontainer}>
                <div>
                    <select onChange={(ev)=>onChangeDiets(ev)}  >
                        <option value="AllDiets">Filtrar por Dieta</option>
                        {
                            diets?.map((diet)=>{
                                return(
                                    <option key={diet.id} value={diet.name}>{diet.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <select onChange={(ev)=>onChangeRecipe(ev)} value={state.recipes}>
                        <option value="All" >All </option>
                        <option value="created" >created</option>
                        <option value="existing">existing</option>
                    </select>
                </div>
                <div>
                    <select onChange={(ev)=>onChangeOrderRecipe(ev)}>
                        <option value="OrderBy">Order By Recipe</option>
                        <option value="ascRecipe">A-Z</option>
                        <option value="descRecipe">Z-A</option>
                    </select>
                </div>
                <div>
                    <select onChange={(ev)=>onChangeOrderHealthScore(ev)}>
                        <option value="OrderByHealthScore">Order By HealthScore</option>
                        <option value="ascHealthScore">1-100</option>
                        <option value="descHealthScore">100-1</option>
                    </select>      
                </div>
                </div>

            </div>
            </div>
            <div className={style.pagination}>
                <Pagination 
                totalPagination={recipes?.length}    
                nroPaginado={state.nroPaginado}
                onClickPagination={onClickPagination}
                />
            </div>


            
        </div>
    )

}