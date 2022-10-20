import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailRecipe, limpieDetalle } from "../../redux/action";
import { useHistory} from "react-router-dom";
import style from "../DetailsRecipe/DetailsRecipe.module.css";

export const DetailsRecipe=(props)=>{
    const dispatch=useDispatch();
        const detailsRecipe=useSelector(state=>state.detailRecipe);
        let history = useHistory();
        
        const [state,setState]=useState({
            loading:true
        })
    
        useEffect(()=>{
            
                dispatch(getDetailRecipe(props.match.params.id));
            
            // setTimeout(() => {
                setState({...state,loading:false});
            // }, 1000);
            
            return ()=>{
                dispatch(limpieDetalle());
            }
            
        },[dispatch]);

        function volver() {
            history.push("/Home");
          }

    return(
        <div>
            
            <div className={style.menu}>
            <button onClick={()=>volver()}>Volver</button>
            </div>
            
            <div className={style.subcontainerdetalle}>
                <div>
                {state.loading ?(
                <div className={style.cargando}>
                    {/* <img src={imagen} alt="NOT FOUND" /> */}
                    <p>Cargando data...</p>
                    
                </div>
                ): (
                    <div>
                        <div className={style.names}>
                            <div className={style.titleName}>
                            {detailsRecipe?.name}
                            </div>
                        </div>
                        <div className={style.container01}>
                            <div className={style.subcontainer01}>
                                <div className={style.image}>
                                    <img src={detailsRecipe?.image} alt="NOT FOUND" />
                                </div>
                            </div>
                            <div className={style.subcontainer02}>
                                <div className={style.diet}>
                                    <div className={style.titleDiet}>Diets Type: </div>
                                    <div>{detailsRecipe?.diet?.map(c=>{
                                        return(
                                            <p key={c} className={style.dietas}>-{c}</p>
                                        )
                                    })}</div>

                                </div>
                            </div>
                            <div className={style.subcontainer03}>
                                <div className={style.dishType}>
                                    <div className={style.titleDishType}>Diets Type: </div>
                                    <div>{detailsRecipe?.dishType?.map(c=>{
                                        return(
                                            <p key={c} className={style.dishh}>-{c}</p>
                                        )
                                    })}</div>

                                </div>

                            </div>
                        </div>
                        <div className={style.container02}>
                            <div className={style.titleHealthScore}>
                                <span>Health Score:</span> {detailsRecipe?.healthScore}
                            </div>
                        </div>
                        <div className={style.container03}>
                            <div className={style.summary}>
                                <h2>Summary :</h2>
                                <p dangerouslySetInnerHTML={{ __html: `${detailsRecipe?.summary}`}}></p>
                            </div>
                        </div>
                        <div className={style.container04}>
                            <div className={style.step}>
                            <h2>Steps :</h2>
                            <p dangerouslySetInnerHTML={{ __html: `${detailsRecipe?.step}`}}></p>
                            </div>     
                        </div>
                    </div>
                )
                }   
                </div>
            
        </div>
        
        </div>
    )
}