import { Link } from "react-router-dom";

export default function Card(props){
    return(
        
        <div key={props.id} className="lg:w-1/3 md:w-1/2 w-full md:overflow-hidden h-auto lg:h-hmax md:float-left p-2">
            <div className="w-full   ">
            <p className="bg-gray-800 text-gray-500 px-5 flex justify-center items-center text-center font-bold text-base h-20">{props.name}</p>
            <img src={props.image} alt="NOT FOUND" className="w-full"/>
            <p className="bg-orange-500 text-gray-700 font-bold text-center text-lg">Health Score: {props.healthScore}</p>
            {/* <button className="w-full bg-red-500" onClick={props.clickDetalles}>Ver Detalles</button> */}
            <div className="h-40 w-full py-3 px-5 bg-gray-500   overflow-hidden ">
            {/* <div className=""> */}
                {/* <p className="w-full text-center"> */}
                    {props.diet}
                {/* </p> */}
                
            {/* </div> */}
            
            </div>
            
                
            </div>
            
        </div>
    )
}