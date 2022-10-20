import React from "react";
import style from "../Cards/Cards.module.css";

export const Cards=(props)=>{
    return(
        <div className={style.containerPrincipal}>
            <div className={style.subcont1}>
            <h2 className={style.name}>{props.name}</h2>
            <img  className={style.image} src={props.image} alt="NOT FOUND" width="300px" height="150px"/>
            <div className={style.container}>
                <div className={style.diet}><span>Diets Types:</span> {props.diet}</div>
                <div className={style.dishType}><span>Dish Types:</span> {props.dishType}</div>
            </div>
            </div>
            <div className={style.subcont2}>
            </div>
            
            
            
        </div>
    )
}
