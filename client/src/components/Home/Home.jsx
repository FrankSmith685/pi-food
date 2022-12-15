import { useEffect } from "react";
import { useState } from "react";
import {React} from "react"
import {useDispatch,useSelector} from "react-redux";
import NavBar from "../../pages/NavBar/NavBar";
import Pagination from "../../pages/Pagination/Pagination";
import { getAllDiets, getAllRecipeByDiets, getAllRecipeByName, getAllRecipeexistandCreated, getAllRecipes, getOrderByHealthScore, getOrderByRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import {FaGithub,FaLinkedin} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

export default function Home(){
    const dispatch=useDispatch();
    const diets=useSelector(state=>state.diets);
    const recipes=useSelector(state=>state.recipes);
    var history=useNavigate();

    // ESTADOS
    const [pagination,setPagination]=useState(1)
    const [perPage,setPerPage]=useState(9)

    const [state,setState]=useState({
        name:"",
        orderRecipe:"",
        orderHealthScore:"",
        markedDiets:[]
    })

    useEffect(()=>{
        dispatch(getAllDiets());
        dispatch(getAllRecipes());
        
    },[dispatch])

    useEffect(()=>{
        const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
    },[document])

    var maximo=0;
    if(pagination===1){
        if((recipes.length === 9 ? recipes.length % 9===0 : null) || (recipes.length === 1 ? recipes.length % 9===1 : null) || (recipes.length === 2 ? recipes.length % 9===2 : null) || (recipes.length === 3 ? recipes.length % 9===3 : null) || (recipes.length === 4 ? recipes.length % 9===4 : null) || (recipes.length === 5 ? recipes.length % 9===5 : null) || (recipes.length === 6 ? recipes.length % 9===6 : null) || (recipes.length === 7 ? recipes.length % 9===7 : null) || (recipes.length === 8 ? recipes.length % 9===8 : null)){
            maximo=recipes.length/perPage;
        }else{
            maximo=recipes.length/perPage-1;
        }
    }else{
        if(recipes.length % 10===0){
            maximo=recipes.length/perPage+1;
        }else{
            maximo=recipes.length/perPage;
        }
    }

    
    // RECIPE POR PAGINA
    const newRecipe=recipes?.slice(   //1
        pagination === 1 ? (pagination-1)* perPage : (pagination-1)* perPage - 1 ,  // 0, 9
        pagination === 1 ? (pagination-1)*perPage+perPage :  (pagination-1)*perPage+ (perPage -1) //9,19
        )
    // console.log(newRecipe); //1,2,3,4,5,6,7,8,9 || 11,12,13,14,15,16,17,18,19,20
    


    function onClickPagination(numero){
        if(numero===1){
            setPagination(numero);
            setPerPage(9);
            
            
        }else{
            setPagination(numero);
            setPerPage(10);
            
        } 
    }

    function handleInput(e){
        setState({...state,name:e.target.value});
    }
    function handleClick(){
        onClickPagination(1);
        dispatch(getAllRecipeByName(state.name));
        const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
            
    }

    function handleOrderByAlfabetic(ev){
        if(ev.target.name==="asc"){
            onClickPagination(1);
            dispatch(getOrderByRecipes(ev.target.value));
            setState({...state,orderRecipe:ev.target.value});
         const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
        }
        if(ev.target.name==="desc"){
            onClickPagination(1);
            dispatch(getOrderByRecipes(ev.target.value));
            setState({...state,orderRecipe:ev.target.value});
            const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
        }
    }

    function handleOrderByHs(ev){
        if(ev.target.name==="asc"){
            onClickPagination(1);
            dispatch(getOrderByHealthScore(ev.target.value));
            setState({...state,orderHealthScore:ev.target.value});
            const datas=document.querySelectorAll(".data");
            datas.forEach(el=>{
            if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                        el.classList.replace("bg-red-600","bg-gray-800");
            }
            if(datas[0].getAttribute('name')===el.getAttribute('name')){
                el.classList.replace("bg-gray-800","bg-red-600");
            }
            })
        }
        if(ev.target.name==="desc"){
            onClickPagination(1);
            dispatch(getOrderByHealthScore(ev.target.value));
            setState({...state,orderHealthScore:ev.target.value});
            const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
        }
    }

    function handleDiets(ev){
        if(ev.target.checked){
                setState({...state,markedDiets:[...state.markedDiets, ev.target.value]});
            }
            else{
                setState({...state,markedDiets: state.markedDiets.filter(diet => diet !== ev.target.value)})
            }
        
    }
    
    function handleButtonDiets(){
        onClickPagination(1);
        dispatch(getAllRecipeByDiets(state.markedDiets));
        const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
    }

    function handleCreated_Existing(ev){
        dispatch(getAllRecipeexistandCreated(ev.target.value));
    }

    function handleReset(ev){
        ev.preventDefault();
        onClickPagination(1);
        dispatch(getAllRecipes());
        const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
        if(datas[0].getAttribute('name')!==el.getAttribute('name')){
                    el.classList.replace("bg-red-600","bg-gray-800");
        }
        if(datas[0].getAttribute('name')===el.getAttribute('name')){
            el.classList.replace("bg-gray-800","bg-red-600");
        }
        })
        
    }

    function campo(){
        return(
            <div>
                <h2 className="text-center p-1 font-bold text-gray-500 text-xl ">Order Recipe</h2>
                <div className="space-y-1">
                <div className=" space-x-1 flex flex-nowrap w-full h-full">
                    <div className=" h-full md:w-full w-full md:text-end">
                        <button name="asc" value="ascRecipe" onClick={handleOrderByAlfabetic} className="bg-gray-700 px-1 py-1 text-sm md:text-base text-gray-500 font-bold w-full">[A-Z]</button>
                    </div>
                    <div className="md:w-full w-full h-full md:text-start ">
                        <button name="desc" value="descRecipe" onClick={handleOrderByAlfabetic} className="bg-gray-700 px-1 py-1 text-sm md:text-base text-gray-500 font-bold w-full">[Z-A]</button>
                    </div>
                </div>
                <div className=" space-x-1  flex flex-nowrap w-full h-full pb-1">
                    <div className=" h-full md:w-full w-full text-end">
                        <button onClick={handleOrderByHs} name="asc" value="ascHealthScore" className="bg-gray-700 md:px-5 px-1 text-sm md:text-base py-1 text-gray-500 font-bold w-full">Min HS</button>
                    </div>
                    <div className="md:w-full w-full h-full text-start">
                        <button onClick={handleOrderByHs} name="desc" value="descHealthScore" className="bg-gray-700 md:px-5 px-1 text-sm md:text-base py-1 text-gray-500 font-bold w-full">Max HS</button>
                    </div>
                </div>
                </div>
                <hr className="w-full h-2 my-2"/>
                <h2 className="text-center  font-serif text-gray-500 text-xl">Filter by Diets</h2>
                <div className="text-gray-500 ">
                
                        {
                            diets?.map(c=>{
                                return(
                                    <div key={c.id}>
                                        
                                        <input onChange={handleDiets}
                                        type="checkbox"  
                                        name={c.name} 
                                        value={c.name}/>
                                        <label> {c.name}</label>
                                    </div>
                                )
                            })
                               
                        }
                        
                      
                </div>
                <button className="w-full bg-gray-500 font-bold text-lg text-gray-800" onClick={handleButtonDiets}>Filter</button>
                <hr className="w-full h-2 my-2"/>
                <div className="w-full">
                    <input type="radio" defaultChecked  name="created_existing"  value="All" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">All</span>
                </div>
                <div className="w-full">
                    <input type="radio" name="created_existing" value="created" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">Created</span>
                </div>
                <div className="w-full">
                    <input type="radio" name="created_existing" value="existing" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">Existing</span>
                </div>      
            </div>
        )
    }

    // function handleDetalles(c){
    //                         history(`home/${c.id}`);
    //                        }
    // function clickDetalles(c){
    //     console.log(c);
    //     console.log("HOLA")
    // }

    return(
        <>
        
        
            <NavBar
            
            handleInput={handleInput}
            handleClick={handleClick}
            handleReset={handleReset}
            name={state.name}
            campo={campo()}
        />
        <div className="lg:mt-3 lg:flex lg:flex-nowrap w-full  h-full ">
        
            <div className="lg:w-1/4 w-1/2 h-auto hidden lg:flex ">
                
                    <div className="w-1/5 fixed">
                        <div className="bg-gray-800 rounded-xl  px-1 h-full max-h-h_max  overflow-y-auto ">
                        <div className="space-y-1">
                            <h2 className="text-center pt-3 font-serif text-gray-500 md:text-xl text-base">Order Recipe</h2>
                        <div className=" space-x-1 flex flex-nowrap w-full h-full">
                            
                            
                            <div className=" h-full md:w-full w-full md:text-end">
                                <button name="asc" value="ascRecipe" onClick={handleOrderByAlfabetic} className="bg-gray-700 px-1 py-1 text-sm md:text-base text-gray-500 font-bold w-full">[A-Z]</button>
                            </div>
                            <div className="md:w-full w-full h-full md:text-start ">
                                <button name="desc" value="descRecipe" onClick={handleOrderByAlfabetic} className="bg-gray-700 px-1 py-1 text-sm md:text-base text-gray-500 font-bold w-full">[Z-A]</button>
                            </div>
                        </div>
                        <div className=" space-x-1  flex flex-nowrap w-full h-full pb-1">
                            <div className=" h-full md:w-full w-full">
                                <button onClick={handleOrderByHs} name="asc" value="ascHealthScore" className="bg-gray-700  px-1 text-sm md:text-base py-1 text-gray-500 font-bold w-full">Min HS</button>
                            </div>
                            <div className="w-full  h-full">
                                <button onClick={handleOrderByHs} name="desc" value="descHealthScore" className="bg-gray-700  px-1 text-sm md:text-base py-1 text-gray-500 font-bold w-full">Max HS</button>
                            </div>
                        </div>
                        <hr className="w-full h-2"/>
                        <h2 className="text-center  font-serif text-gray-500 text-xl">Filter by Diets</h2>
                        <div className="text-gray-500 ">
                        
                                {
                                    diets?.map(c=>{
                                        return(
                                            <div key={c.id}>
                                                
                                                <input onChange={handleDiets}
                                                type="checkbox"  
                                                name={c.name} 
                                                value={c.name}/>
                                                <label> {c.name}</label>
                                            </div>
                                        )
                                    })
                                       
                                }
                                
                              
                            </div>
                        <div>
                            <button className="w-full bg-gray-500 font-bold text-lg text-gray-800" onClick={handleButtonDiets}>Filter</button>
                        </div>
                        <hr className="w-full h-2"/>
                        <div className="w-full">
                            <input type="radio" defaultChecked  name="created_existing"  value="All" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">All</span>
                        </div>
                        <div className="w-full">
                            <input type="radio" name="created_existing" value="created" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">Created</span>
                        </div>
                        <div className="w-full">
                            <input type="radio" name="created_existing" value="existing" onChange={handleCreated_Existing} id="" /><span className="text-gray-500 font-serif text-sm">Existing</span>
                        </div>
                            </div>
                       
                        </div>

                        
                    
                    </div>
                    

            </div>
            
            <div className="w-full z-40 h-auto bg-gray-700  lg:h-full lg:ml-4 lg:rounded-xl lg:p-2">
                
            <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    maximo={maximo}
                    handleButton={onClickPagination}
                />
                
                    {
                        newRecipe?.map(c=>{
                           
                            return(
                                <div key={c.id}>
                                    <Link to={`/home/${c.id}`}>
                                    <Card 
                                        id={c.id}
                                        name={c.name}
                                        image={c.image}
                                        healthScore={c.healthScore}
                                        // clickDetalles={clickDetalles}
                                        diet={c.diet.map(d=>{
                                            return(
                                                <p key={d} className="float-left w-auto mx-2 my-1 px-3 py-1 text-sm rounded-xl bg-gray-700 font-bold text-gray-400">{d}</p>
                                            )
                                        })}
                                        
                                    />
                                    </Link>
                               {/* <button onClick={()=>clickDetalles(c)}> Ver Detalles</button> */}


                                </div>
                            )
                        })
                    }
                </div>

                
            </div>
        </>
    )
}