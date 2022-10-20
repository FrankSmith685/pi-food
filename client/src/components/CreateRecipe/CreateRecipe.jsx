import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllDiets, getAllRecipe, postRecipe } from "../../redux/action";
import style from "../CreateRecipe/CreateRecipe.module.css";
import {Link, useHistory} from "react-router-dom";

export const CreateRecipe=()=>{
    const dispatch=useDispatch();
    const diets=useSelector(state=>state.diet);
    const recipes=useSelector(state=>state.recipe);
    useEffect(()=>{
        dispatch(getAllDiets());
        dispatch(getAllRecipe());
    },[dispatch])
    const history=useHistory();

    //dishtype
    const dishtype=[];
    recipes?.map((recipe)=>recipe.dishType?.forEach(c=>{
        dishtype.push(c);
    }));

    const newDishType=[];
        dishtype?.forEach((dishType)=>{
            if(!newDishType?.includes(dishType)){
                newDishType?.push(dishType);
            }
        })
        

    //Estados
    const [state,setState]=useState({
        name:"",
        summary:"",
        healthScore:"",
        step:"",
        diet:[],
        dishType:[]
    });
    //Estado de Errores
    const [error,setError]=useState({
        name:false,
        summary:false,
        healthScore:false,
        step:false,
        diet:false,
        dishType:false
    });
    //Estado de Validate
    const [validate,setValidate]=useState({
        name:false,
        summary:false,
        healthScore:false,
        step:false,
    });

    //Estado de Diets
    const [dietss,setDietss]=useState({
        name:""
    })

    const [dishTypess,setDishTypess]=useState({
        name:""
    })

    //Estado de HealthScore
    const [validateHealthScore,setValidateHealthScore]=useState({
        healthScore:false
    })

    //validar los campos
    //Expresiones
    const expresiones={
        name: /^[a-zA-ZñÑ ]{1,40}$/,
        summary:/^[a-zA-Z0-9ñÑ.:-;_\s\n]{1,1000}$/,
        healthScore: /^[0-9]{1,3}$/,
        step: /^[a-zA-Z0-9ñÑ.:-;_\s\n]{1,1000}$/,
    }
    function validarExpresiones(ev){
        switch (ev.target.name) {
            case "name":
                if(ev.target.value===""){
                    setError({...error,name:true});
                    setValidate({...validate,name:false});
                }else{
                    if(expresiones.name.test(ev.target.value)){
                        setValidate({...validate,name:false});
                    }else{
                        setValidate({...validate,name:true});
                    }
                }
                break;
            case "summary":
                if(ev.target.value===""){
                    setError({...error,summary:true});
                    setValidate({...validate,summary:false});
                }else{
                    if(expresiones.summary.test(ev.target.value)){
                        setValidate({...validate,summary:false});
                    }else{
                        setValidate({...validate,summary:true});
                    }
                }
                break;
            case "healthScore":
                if(ev.target.value===""){
                    setError({...error,healthScore:true});
                    setValidate({...validate,healthScore:false});
                    setValidateHealthScore({...state,healthScore:false});
                }else{
                    if(expresiones.healthScore.test(ev.target.value)){
                            setValidate({...validate,healthScore:false});
                            // setValidateHealthScore({...state,healthScore:true});
                        
                    }else{
                        setValidate({...validate,healthScore:true});
                        setValidateHealthScore({...state,healthScore:false});

                    }
                }
                break;
            case "steps":
                if(ev.target.value===""){
                    setError({...error,step:true});
                    setValidate({...validate,step:false});
                }else{
                    if(expresiones.step.test(ev.target.value)){
                        setValidate({...validate,step:false});
                    }else{
                        setValidate({...validate,step:true});
                    }
                }
                break;

            default:
                break;
        }

    }
    //Validamos los componentes
    //=>NAME
    function onChangeName(ev){
        setState({...state,name:ev.target.value});
        setError({...error,name:false});
    }
    function onBlurName(ev){
        validarExpresiones(ev);
    }
    function onKeyName(ev){
        validarExpresiones(ev);
    }
    //=>Summary
    function onChangeSummary(ev){
        setState({...state,summary:ev.target.value});
        setError({...error,summary:false});
    }
    function onBlurSummary(ev){
        validarExpresiones(ev);
    }
    function onKeySummary(ev){
        validarExpresiones(ev);
    }

    //=>HealhtScore
    function onChangeHealthScore(ev){
        setState({...state,healthScore:ev.target.value});
        setError({...error,healthScore:false});
    }

    function onBlurHealthScore(ev){
        validarExpresiones(ev);
    }

    function onKeyHealthScore(ev){
        validarExpresiones(ev);
    }

    //=>Steps
    function onChangeStep(ev){
        setState({...state,step:ev.target.value});
        setError({...error,step:false});
    }
    function onBlurStep(ev){
        validarExpresiones(ev);
    }

    function onKeyStep(ev){
        validarExpresiones(ev);
    }

    //=>Diets
    function onChangeSelectDiet(ev){
        if(!state.diet.includes(ev.target.value)){
            if(ev.target.value!=="All"){
                setState({...state,diet:[...state.diet,ev.target.value]});
            setError({...error,diet:false})
            setDietss({...dietss,name:ev.target.value});
            }
        }
    }

   


    function onClickDeleteDiet(ev){
        setState({...state,diet:[...state.diet].filter((diet)=>diet!==ev)});
    }

    function onChangeSelectDishType(ev){
        if(!state.dishType.includes(ev.target.value)){
            if(ev.target.value!=="All"){
                setState({...state,dishType:[...state.dishType,ev.target.value]});
            setError({...error,dishType:false})
            setDishTypess({...dishTypess,name:ev.target.value});
            }
        }
    }

    function onClickDeleteDishType(ev){
        setState({...state,dishType:[...state.dishType].filter((dishType)=>dishType!==ev)});
    }

    //Buton
    function onClickSubmit(){
        if(state.name==="" && state.summary==="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
            setError({...error,name:true,summary:true,healthScore:true,step:true,diet:true,dishType:true})
        }else if(state.name!=="" && state.summary==="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
            setError({...error,name:false,summary:true,healthScore:true,step:true,diet:true,dishType:true})
        }else if(state.name!=="" && state.summary!=="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
            setError({...error,name:false,summary:false,healthScore:true,step:true,diet:true,dishType:true})
        }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
            setError({...error,name:false,summary:false,healthScore:false,step:true,diet:true,dishType:true})
        }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step!=="" && dietss.name==="" && dishTypess.name===""){
            setError({...error,name:false,summary:false,healthScore:false,step:false,diet:true,dishType:true})
        }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step!=="" && dietss.name!=="" && dishTypess.name===""){
            setError({...error,name:false,summary:false,healthScore:false,step:false,diet:false,dishType:true})
        }else if(state.healthScore<0 || state.healthScore>100){
            alert("Error: healthScore debe ser entre 1 a 100 ");
        }
        else{
            if(recipes?.some((recipe)=>recipe.name===state.name)){
            alert("Error: El Recipe ya existe");

            }else if(state.name==="" && state.summary==="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
                setError({...error,name:true,summary:true,healthScore:true,step:true,diet:true,dishType:true})
            }else if(state.name!=="" && state.summary==="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
                setError({...error,name:false,summary:true,healthScore:true,step:true,diet:true,dishType:true})
            }else if(state.name!=="" && state.summary!=="" && state.healthScore==="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
                setError({...error,name:false,summary:false,healthScore:true,step:true,diet:true,dishType:true})
            }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step==="" && dietss.name==="" && dishTypess.name===""){
                setError({...error,name:false,summary:false,healthScore:false,step:true,diet:true,dishType:true})
            }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step!=="" && dietss.name==="" && dishTypess.name===""){
                setError({...error,name:false,summary:false,healthScore:false,step:false,diet:true,dishType:true})
            }else if(state.name!=="" && state.summary!=="" && state.healthScore!=="" && state.step!=="" && dietss.name!=="" && dishTypess.name===""){
                setError({...error,name:false,summary:false,healthScore:false,step:false,diet:false,dishType:true})
            }else{
                console.log(state.healthScore);
            dispatch(postRecipe(state));
            setState({...state,name:"",summary:"",healthScore:"",step:"",diet:[],dishType:[]});
            setDietss({...dietss,name:"All"})
            setDishTypess({...dishTypess,name:"All"})
            alert("Se ha creado correctamente");
                history.push("/Home");
            }
        }
    }

    return(
        <div className={style.container}>
            <div className={style.menu}>
                <Link to="/home"><button>Volver</button></Link>
            </div>
            <div className={style.subcontainer}>
                <div className={style.subbcontainer01}>
                    <div className={style.createdRecipe}>
                    <span>Create recipe</span>
                    </div>
                </div>
                <div className={style.subbcontainer2}>
                        <div className={style.primero}>
                            <div className={style.subprimer}>
                                <div className={style.names}>
                                <label>Name: </label>
                                <input type="text" onChange={(ev)=>onChangeName(ev)} value={state.name} name="name" onBlur={(ev)=>onBlurName(ev)} onKeyUp={(ev)=>onKeyName(ev)} placeholder="Introduce el nombre de Receta" />
                                
                                {
                                    (error.name && !validate.name )&& (
                                        <p className={style.error}>No dejar los espacios en blanco</p>
                                    )
                                }
                                {
                                    validate.name && (
                                        <p className={style.error}>Debe contener caracteres correctamente</p>
                                    )
                                }
                                </div>
                            </div>
                            <div className={style.subsegundo}>
                                <div className={style.healthScores}>
                                    <label>Health Score: </label>
                                <input type="text" onChange={(ev)=>onChangeHealthScore(ev)} value={state.healthScore} name="healthScore" onBlur={(ev)=>onBlurHealthScore(ev)} onKeyUp={(ev)=>onKeyHealthScore(ev)} placeholder="Introduce el puntaje de Receta" />
                                
                                {
                                    (error.healthScore && !validate.healthScore )&& (
                                        <p className={style.error}>No dejar los espacios en blanco</p>
                                    )
                                }
                                {
                                    validate.healthScore && (
                                        <p className={style.error}>Debe contener caracteres correctamente</p>
                                    )
                                }
                                {
                                    validateHealthScore.healthScore && (
                                        <p className={style.error}>Error: Debe tener entre 1 a 100</p>
                                    )
                                }
                            </div>
                            </div>
                        </div>
                        <div className={style.segundo}>
                            <div className={style.subprimer01}>
                                <div className={style.summaries}>
                                    <label>Summary: </label>
                                    <textarea name="summary" value={state.summary} cols="60" rows="7" placeholder="Escribe alguna descripcion" onChange={(ev)=>onChangeSummary(ev)} onBlur={(ev)=>onBlurSummary(ev)} onKeyUp={(ev)=>onKeySummary(ev)}></textarea>
                                    {
                                    (error.summary && !validate.summary )&& (
                                    <p className={style.error}>No dejar los espacios en blanco</p>
                                    )
                                    }
                                    {
                                        validate.summary && (
                                            <p className={style.error}>Debe contener caracteres correctamente</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={style.subsegundo01}>
                                <div className={style.stepss}>
                                    <label>Steps: </label>
                                    <textarea name="steps" value={state.step} cols="60" rows="7" placeholder="Escribe algunos pasos" onChange={(ev)=>onChangeStep(ev)} onBlur={(ev)=>onBlurStep(ev)} onKeyUp={(ev)=>onKeyStep(ev)}></textarea>
                                    {
                                        (error.step && !validate.step )&& (
                                        <p className={style.error}>No dejar los espacios en blanco</p>
                                        )
                                    }
                                    {
                                        validate.step && (
                                            <p className={style.error}>Debe contener caracteres correctamente</p>
                                        )
                                    }
                                
                                </div>
                            </div>
                        </div>
                </div>
                <div className={style.subbcontainer3}>
                    <div className={style.sub01}>
                    <div className={style.dietsss}>
                        <label>Diets: </label>
                        <select onChange={(ev)=>onChangeSelectDiet(ev)} value={dietss.name} name="diet">
                            <option value="All">Select Diet: </option>
                            {
                                diets?.map((diet)=>{
                                    return(
                                        <option key={diet.id} value={diet.name}>{diet.name}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            error.diet && (
                                <p className={style.error}>Debe seleccionar alguna Dieta</p>
                            )
                        }
                        <div>
                        {
                            state.diet?.map((diet)=>{
                                return(
                                    <div key={diet} className={style.subdieta}>
                                        <p>{diet}</p>
                                        <button onClick={()=>onClickDeleteDiet(diet)}>X</button>
                                    </div>
                                    )
                            })
                        }
                    </div>

                    </div>
                    </div>
                    <div className={style.sub02}>
                        <div className={style.dishTypess}>
                            <label>Dish Types: </label>
                                <select onChange={(ev)=>onChangeSelectDishType(ev)} value={dishTypess.name} name="dishType">
                                <option value="All">Select DishType: </option>
                                {
                                    newDishType?.map((dishtype)=>{
                                        return(
                                            <option key={dishtype} value={dishtype}>{dishtype}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                error.dishType && (
                                    <p className={style.error}>Debe seleccionar algun Dish Type</p>
                                )
                            }
                            <div>
                            {
                            state.dishType?.map((dishType)=>{
                                return(
                                    <div key={dishType} className={style.subdieta}>
                                        <p>{dishType}</p>
                                        <button onClick={()=>onClickDeleteDishType(dishType)}>X</button>
                                    </div>
                                    )
                            })
                            }
                            </div>
                        </div>
                        <div className={style.submit}>
                        <button onClick={()=>onClickSubmit()}>submit</button>
                        </div>
                        </div>
                        
                    </div> 
                </div>
  
            </div>
            
    )
}