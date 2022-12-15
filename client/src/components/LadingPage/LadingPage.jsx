import { createRef, useEffect } from "react";
import image1 from "../../images/image_lading.jpg";
import image2 from "../../images/imagen1.png";
import {FaLinkedin,FaGithub} from "react-icons/fa"
import { useNavigate } from "react-router-dom";


export default function LadingPage(){
    let contenedor_texto=createRef();
    let texto_cocina=createRef();

    const history=useNavigate();
   
    useEffect(()=>{
        let contenedor_texto_1=contenedor_texto.current;
        let texto_cocina_1=texto_cocina.current;
        setTimeout(()=>{
            
            contenedor_texto_1.classList.remove("hidden");
            texto_cocina_1.classList.add("animate-[texto_3s_ease-in-out_1]");
        },5000)
    },[])

    function handleIngresar(ev){
        ev.preventDefault();
        history("/home");
    }

    return(
        <div className=" md:relative w-full h-full min-h-screen relative">
            <div className="md:flex md:flex-nowrap w-full md:h-screen  grid h-full">
                <div className="w-full h-full">
                    <div className="  md:h-full md:flex md:justify-start md:items-center h-full md:w-auto w-full ">
                        <div  className="w-full   md:animate-[wiggle_5s_ease-in-out_1] relative overflow-hidden">
                            {/* HOLA */}
                            <img src={image1} alt="" className="md:rounded-r-3xl md:animate-[imagen1_1s_ease-in-out_5] w-full max-h-80" />
                            <div  className="absolute  md:top-0 top-0  md:right-10 right-0  lg:w-auto md:w-full  w-full  h-full  text-center   overflow-hidden flex justify-center items-center max-w-2xl md:pl-32 lg:pl-32 px-14 md:px-0">
                                <div ref={contenedor_texto} className="overflow-hidden h-14 hidden">
                                <p ref={texto_cocina} className="text-black md:text-base lg:text-lg font-bold text-lg  w-full">Todas las Recetas del mundo en un solo lugar</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-3/4 w-full h-full pt-5 md:mt-0  ">
                    <div className="flex justify-center items-center h-full w-auto">
                        <div className="flex flex-col">
                            <div className="md:bg-red-500 bg-red-800 py-3 px-10 md:px-2 rounded-2xl md:text-xl lg:text-3xl font-bold text-white animate-[imagen1_1s_ease-in-out_5] flex flex-col">
                                <span>HENRY - FOODS</span>  
                                <span className="text-base text-black text-center">-Proyecto Individual-</span>
                            </div>
                            <div className="w-full h-auto text-center md:mt-8 mt-3 pt-3">
                                <button onClick={handleIngresar} className="bg-gray-700 text-white md:px-5 px-10 py-3 rounded-xl font-bold hover:bg-slate-800">INGRESAR</button>
                            </div>
                        </div>
                        
                            
                    </div>  
                     
                </div>
                <div className="w-full md:flex hidden">
                    <div className="flex justify-start items-center h-full w-auto">
                        <img src={image2} alt="" className="animate-[texto_5s_ease-in-out_1]" />
                    </div>
                </div>
                <div className="md:hidden w-full   absolute bottom-14">
                        <div className="text-3xl">
                            <a href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                                <FaLinkedin/>
                                <span className="font-bold">Linkedin</span>
                            </a>
                        </div>
                        <div className="text-3xl">
                            <a href="https://github.com/FrankSmith685" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                                <FaGithub/>
                                <span className="font-bold">Github</span>
                            </a>
                        </div>
                </div>
            </div>

            <div className="md:absolute md:bottom-16 md:left-56 lg:left-80 w-auto  text-3xl hidden md:flex">
                <a href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                    <FaLinkedin/>
                    <span className="font-bold">Linkedin</span>
                </a>
            </div>
            <div className="md:absolute md:bottom-16 md:right-56 lg:right-80 w-auto  text-3xl hidden md:flex">
                <a href="https://github.com/FrankSmith685" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center space-x-1">
                    <FaGithub/>
                    <span className="font-bold">Github</span>
                </a>

            </div>
            
        </div>
    )
}