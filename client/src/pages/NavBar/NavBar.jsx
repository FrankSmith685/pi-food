import { createRef } from "react";
import { FaAlignJustify, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar(props){

    let contenedor_mobile=createRef();

    function handleJustify(ev){
        ev.preventDefault();
        let contenedor_mobile_1=contenedor_mobile.current;
        contenedor_mobile_1.classList.toggle("-mt-96");
        contenedor_mobile_1.classList.toggle("hidden");
    }
    
    return(
        <>        
        <nav className=" shadow-lg lg:fixed   w-full   z-50">
            <div className="h-auto bg-gray-900 py-2 w-full ">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-yellow-600 md:text-base text-xs font-serif">Henry's PI</span><h1 className="text-white font-extrabold md:text-base text-xs">FOOD-APP</h1>
                    </div>
                    <div className="w-80 hidden lg:flex justify-center items-center ">
                        <input onChange={props.handleInput} value={props.name} className=" bg-gray-700 rounded-l-md py-1 text-white  focus:outline-none  px-4 md:w-full w-40" type="text" placeholder="Search..." name="name"/>
                        <button onClick={props.handleClick} className="bg-slate-400 py-2 px-3 rounded-r-md">
                            <FaSearch className="text-gray-700 "/>
                        </button>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <button onClick={props.handleReset} className="py-0 px-0 text-gray-500 font-serif font-semibold hover:text-yellow-600 transition duration-300">Reset</button>
                        <Link to="/home"><button className="py-0 px-0 text-gray-500 font-serif font-semibold hover:text-yellow-600 transition duration-300">Home</button></Link>
                        <Link to="/addRecipe"><button className="py-0 px-0 text-gray-500 font-serif font-semibold hover:text-yellow-600 transition duration-300">Add Recipe</button></Link>
                        <Link to="/about"><button className="py-0 px-0 text-gray-500 font-serif font-semibold hover:text-yellow-600 transition duration-300">About</button></Link>
                    </div>
                    <div className="lg:hidden flex items-center">
	                    <button className="outline-none " >
                            <FaAlignJustify onClick={handleJustify} className="w-6 h-7 text-gray-500"/> 
                        </button>
                    </div>
                </div>
            </div>
            </div>
            
            <div ref={contenedor_mobile} className="bg-gray-800  w-full h-auto p-2 -mt-96 lg:hidden hidden ease-linear transition-all duration-300 -z-50">
                <div className="w-full flex justify-center items-center ">
                    <input onChange={props.handleInput} value={props.name} className=" bg-gray-700 rounded-l-md py-1 text-gray-300  focus:outline-none  px-4 w-full" type="text" placeholder="Search..." name="name"/>
                    <button onClick={props.handleClick} className="bg-slate-400 py-2 px-3 rounded-r-md">
                        <FaSearch className="text-gray-700 "/>
                    </button>
                </div>
                <hr className="w-full h-2 my-2"/>
                <div className="space-x-4">
                    <ul className="w-full space-y-1 text-base">
                        <li className="w-full py-1 px-2 bg-gray-600 "><button onClick={props.handleReset} className="py-0 px-0 text-gray-400 font-serif font-semibold hover:text-yellow-600 transition duration-300">Reset</button></li>
                        <li className="w-full py-1 px-2 bg-gray-600 "><Link to="/home"><button className="py-0 px-0 text-gray-400 font-serif font-semibold hover:text-yellow-600 transition duration-300">Home</button></Link></li>
                        <li className="w-full py-1 px-2 bg-gray-600 "><Link to="/addRecipe"><button className="py-0 px-0 text-gray-400 font-serif font-semibold hover:text-yellow-600 transition duration-300">Add Recipe</button></Link></li>
                        <li className="w-full py-1 px-2 bg-gray-600 "><Link to="/about"><button className="py-0 px-0 text-gray-400 font-serif font-semibold hover:text-yellow-600 transition duration-300">About</button></Link></li>
                    </ul>
                        
                        
                        
                        
                </div>
                <hr className="w-full h-2 mt-2"/>
                <div className="w-full ">
                    {props.campo}
                </div>
            </div>
        </nav>
        
        <div className="lg:pb-14">

        </div>
    </>
    )
}