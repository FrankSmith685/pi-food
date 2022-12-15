import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDetailRecipe, limpieDetalle } from "../../redux/actions";
// import NavBarMain from "../../pages/NavBar/NavBarMain"

export default function DetailsRecipe(){
    const location=useLocation();
    const dispatch=useDispatch();
    const detailsRecipe=useSelector(state=>state.detailRecipe);
    const [state,setState]=useState({
        loading:true
    })
    
    useEffect(()=>{
        let local=location.pathname;
        let id=local.split("/");
        dispatch(getDetailRecipe(id[2]));
        setState({...state,loading:false});
        
        return ()=>{
            dispatch(limpieDetalle());
            

        }
    },[dispatch,location]);

    const { loading } = useSelector(state => state);
    console.log(loading);
// console.log(state.loading)

    return(
        <>
            
                <div className=" w-full p-2 h-auto">
                <div className="my-1">
                    <Link to="/home">
                    <button className="bg-gray-800 w-auto px-2  rounded-xl text-gray-500 font-bold text-base">Go Back</button>
                    </Link>
                </div>
                {loading===true ? <p>CARGANDO</p>:(
                    <div key={detailsRecipe.id} className="bg-gray-800 h-full p-2 w-full rounded-xl">
                    
                    <div className="bg-gray-600  p-1 rounded-xl">
                        <h2 className="text-center w-full lg:text-2xl font-bold text-base text-gray-900 p-1 rounded-xl bg-orange-700 lg:bg-transparent">{detailsRecipe.name}</h2>
                        <div className="flex justify-center items-center w-full mt-2">
                            <img src={detailsRecipe.image} alt="" className="rounded-xl"/>
                        </div>
                        <div className="bg-gray-800 mt-2 text-gray-400 text-sm p-2 h-auto w-full  rounded-xl">
                        <p dangerouslySetInnerHTML={{ __html: `${detailsRecipe?.summary}`}}></p>
                        </div>
                        <p className=" my-2 w-auto text-center font-bold text-base mx-24 text-gray-900 p-1 rounded-xl bg-red-700 lg:bg-transparent">Health Score: {detailsRecipe.healthScore}</p>
                        <div className=" h-28 overflow-auto w-full  p-2  mb-auto ">
                            {detailsRecipe.diet?.map(c=>{
                                return(
                                    <p key={c} className=" float-left my-1  bg-gray-700 text-gray-400 font-bold text-sm rounded-xl px-2 mx-1">{c}</p>
                                )
                            })}
                        </div>
                        <div className=" h-20 overflow-auto w-full  p-2  mb-auto ">
                            {detailsRecipe.dishType?.map(c=>{
                                return(
                                    <p key={c} className=" float-left my-1  bg-gray-700 text-gray-400 font-bold text-sm rounded-xl px-2 mx-1">{c}</p>
                                )
                            })}
                        </div>
                        
                    </div>
                    <div className="bg-gray-600 p-1 mt-2 rounded-xl">
                        <div className="bg-gray-800 mt-2 text-gray-400 text-sm p-2 h-auto w-full  rounded-xl">
                            <h2 className="text-center text-lg font-bold text-gray-500">Steps</h2>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: `${detailsRecipe?.step}`}}></p>
                        </div>
                    </div>
                </div>

                )}
            </div>
            
            
        </>
    )
}