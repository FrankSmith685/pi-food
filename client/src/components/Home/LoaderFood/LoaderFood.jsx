import React from "react";
import style from "../LoaderFood/LoaderFood.module.css";

export const LoaderFood=()=>{
    return(
        <div className={style.cargando}>
            <p>Cargando...</p>
        </div>
    )
}