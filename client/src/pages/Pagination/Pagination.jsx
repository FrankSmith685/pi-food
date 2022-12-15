
import { createRef } from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa"

export default function Pagination({pagination,maximo,handleButton}){
    let data=[]
    let numero=Math.ceil(maximo);


    let paginate=createRef();

    const nextPage=(e)=>{
        e.preventDefault();
        if(pagination<=(Math.ceil(maximo)-1)){
            handleButton(pagination+1);
            const datas=document.querySelectorAll(".data");
            datas.forEach(el=>{
            if(datas[pagination].getAttribute('name')!==el.getAttribute('name')){
                        el.classList.replace("bg-red-600","bg-gray-800");
            }
            if(datas[pagination].getAttribute('name')===el.getAttribute('name')){
                el.classList.replace("bg-gray-800","bg-red-600");
            }
        })
            
        }
    }
    const previusPage=(e)=>{
        e.preventDefault();
        if(pagination>1){
            handleButton(pagination-1);
            const datas=document.querySelectorAll(".data");
            datas.forEach(el=>{
            if(datas[pagination-2].getAttribute('name')!==el.getAttribute('name')){
                el.classList.replace("bg-red-600","bg-gray-800");
            }
            if(datas[pagination-2].getAttribute('name')===el.getAttribute('name')){
                el.classList.replace("bg-gray-800","bg-red-600");
            }
            })
        }
    }

    
    // console.log(numero);

    for(let i=1;i<=numero;i++){
        data.push(i);
    }

    function handleButtons(n){
        handleButton(n);
        const datas=document.querySelectorAll(".data");
        datas.forEach(el=>{
            if(datas[n-1].getAttribute('name')!==el.getAttribute('name')){
                        el.classList.replace("bg-red-600","bg-gray-800");
            }
            if(datas[n-1].getAttribute('name')===el.getAttribute('name')){
                el.classList.replace("bg-gray-800","bg-red-600");
            }
        })
      
    }


    return(
        <div className="flex  flex-nowrap w-full items-center justify-center py-3">
            <button onClick={previusPage} className=" text-gray-400 bg-gray-800 text-xl rounded-lg  px-2 py-1 mx-1"><FaAngleLeft/></button>
            {data.map(n=>{
                return(

                    <button key={n} ref={paginate} name={n} className="data bg-gray-800 mx-mx1 text-gray-400 rounded-lg font-bold w-9 flex justify-center items-center hover:text-gray-300 hover:bg-orange-600 active:bg-orange-700 focus:outline-none   focus:text-gray-300" onClick={(c)=>handleButtons(n)}>{n}</button>
                )
            
            })}

            <button onClick={nextPage} className="text-gray-400 bg-gray-800 text-xl rounded-lg  px-2 py-1 mx-1"><FaAngleRight/></button>
        </div>
    )
}