import React from "react";
import style from '../NavBar/NavBar.module.css';
import img from '../../image/cooking.png';
import {Link} from "react-router-dom";

export const NavBar=(props)=>{
    return(
        <div className={style.container}>
            <div className={style.subcontainer1}>
                <img src={img} className={style.image}/>
                <span className={style.span}>APP-FOOD</span>
                <div className={style.subbutton}>
                    <button className={style.refress} onClick={props.onclickRefress}>Refress</button>
                    <Link to="/createRecipe" className={style.created}><button >Crear nueva Receta</button></Link>
                </div>
            </div>
            
            <div className={style.subcontainer2}>
                <input type="text" placeholder="Buscar Receta" onChange={props.onChangeReceta} value={props.value}/>
                <button onClick={props.onclickReceta}>Buscar</button>
            </div>
            
        </div>
    )
}