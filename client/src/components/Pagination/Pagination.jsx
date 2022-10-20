import React from "react";
import style from "../Pagination/Pagination.module.css";

export const Pagination=({totalPagination,nroPaginado,onClickPagination})=>{
    var pagination=[];

    if(nroPaginado===9){
        for(let i=1;i<=Math.ceil(totalPagination/nroPaginado);i++){
            pagination.push(i);
        }
    }else{
        for(let i=1;i<=Math.ceil(totalPagination/9);i++){
            pagination.push(i);
        }
    }
    return(
        <div className={style.Pagination}>
            <ul>
            {
                pagination.map(N=>{
                    return(
                        <button key={N} onClick={()=>onClickPagination(N)}>{N}</button>
                    )
                })
            }
            </ul>
            
        </div>
    )
}