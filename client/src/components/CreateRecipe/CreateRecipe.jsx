import { Formik, Form } from "formik";
import CustomInput from '../../pages/Custom/CustomInput';
import * as yup from "yup";
import CustomTextArea from "../../pages/Custom/CustomTextArea";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { getAllDiets, getAllRecipes, postRecipe } from "../../redux/actions";
import CustomSelect from "../../pages/Custom/CustomSelect";
import {useNavigate} from "react-router-dom"

export default function CreateRecipe(){
    const dispatch=useDispatch();
    const diets=useSelector(state=>state.diets);
    const recipes=useSelector(state=>state.recipes);
    const history=useNavigate();

    useEffect(()=>{
        dispatch(getAllDiets());
        dispatch(getAllRecipes());
    },[dispatch])

    //dishtype
    const dishtype=[];
    recipes?.map((recipe)=>recipe.dishType?.forEach(c=>{
        dishtype.push(c);
    }));

    const [state,setState]=useState({
        diet:[],
        dishType:[]
    });

    const newDishType=[];
        dishtype?.forEach((dishType)=>{
            if(!newDishType?.includes(dishType)){
                newDishType?.push(dishType);
            }
        })

    const products = {
    }

    async function onSubmit(values, actions) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm()
      }

      const ValidateInput = yup.object().shape({
        'name': yup
          .string()
          .max(20, "Line must have max 20 characters")
          .required("Required name"),
        // 'diet': yup
        //   .string()
        // //   diets.map(c=>c.name)
        //   .oneOf(["dairy free"])
        //   .required("Required Diet"),
        // 'dishType': yup
        //   .string()
        //   .oneOf(newDishType)
        //   .required("Required DishType"),
        'healthscore': yup
          .string()
          .matches(/^[0-9]{1,3}$/, "the field must be healthscore appropriately")
          .required("Required healthscore"),
        'summary': yup
          .string()
          .max(500, "Line must have max 500 characters")
          .required("Required summary"),
        'steps': yup
          .string()
          .max(500, "Line must have max 500 characters")
          .required("Required summary"),
      })
    
      function onChangeValue(ev,props){
        // if(ev.target.name==="diet"){
            if(!state.diet.includes(ev.target.value)){
                if(ev.target.value!=="All"){
                    setState({...state,diet:[...state.diet,ev.target.value]});
                }
           }
        
      }
      function onChangeValueDishType(ev,props){
        // if(ev.target.name==="dishtype"){
            if(!state.dishType.includes(ev.target.value)){
                if(ev.target.value!=="All"){
                    setState({...state,dishType:[...state.dishType,ev.target.value]});
                }
            }
        // }
      }

      function onClickDeleteDiet(ev,props){
        setState({...state,diet:[...state.diet].filter((diet)=>diet!==ev)});
    }
    function onClickDeleteDishType(ev){
        setState({...state,dishType:[...state.dishType].filter((dishType)=>dishType!==ev)});
    }

    
    function onCLick(ev, props) {
        if (Object.keys(props.errors).length == 0) {
            console.log(ev)
            let data={
                name:ev.name,
                healthScore:ev.healthscore,
                step:ev.steps,
                summary:ev.summary, 
                diet:state.diet,
                dishType:state.dishType

            }
            dispatch(postRecipe(data));
            alert("successfully created");
            history("/home")

        }
        if (Object.keys(props.touched).length == 0) {
        //   swal({ title: `You must complete all fields` })
        alert("you must complete the data");
        }
      }
      function onClickCancel(ev) {
        alert("has been canceled")
        history("/home")
      }


    return (
        <div className=" p-2  w-full md:flex md:item-center md:justify-center">
            <div className="bg-gray-900 h-full md:w-1/2 lg:w-1/3 lg:mt-2 p-2 ">
                <h2 className="text-center text-gray-500 font-bold text-xl">Create Recipe</h2>
                <div>
                <Formik initialValues={products} onSubmit={onSubmit} validationSchema={ValidateInput}>
                    {
                    (props) => (
                    <>
                    <Form className="shadow-lg mb-5 row g-3 needs-validation p-3 form border-info ">
                        <CustomInput
                            label="Name: "
                            name="name"
                            type="text"
                            placeholder="Enter the name"
                        />
                        <CustomInput
                            label="Health Score: "
                            name="healthscore"
                            type="number"
                            placeholder="Enter the healthscore"
                        />
                        <CustomTextArea
                            label="Summary: "
                            name="summary"
                            type="text"
                            placeholder="Enter the Summary"
                        />
                        <CustomTextArea
                            label="Steps : "
                            name="steps"
                            type="text"
                            placeholder="Enter the Steps"
                        />
                        <CustomSelect
                            label="All Diet: "
                            name="diet"
                            type="text"
                            placeholder="Please Selecciona:"
                            onChange={(ev) => onChangeValue(ev, props)}
                        >
                        <option value="All">Select Diet: </option>
                        {
                          diets.map((e) => {
                            return(
                                <option key={e.id} id="diet" value={e.name}>{e.name}</option>
                            )
                          })
                        }
                        </CustomSelect>
                        {
                            state.diet?.map((diet)=>{
                                return(
                                    <div key={diet} className="bg-gray-600 text-gray-900 font-bold rounded-xl px-3 mt-2  flex items-center justify-between w-full" >
                                        <p className="px-0">{diet}</p>
                                        <button className="text-red-800" onClick={()=>onClickDeleteDiet(diet,props)}>X</button>
                                    </div>
                                    )
                            })
                        }
                        <CustomSelect
                            label="All Dish Type: "
                            name="dishType"
                            type="text"
                            placeholder="Please Selecciona:"
                            onChange={(ev) => onChangeValueDishType(ev, props)}
                        >
                        <option value="">Select DishType: </option>
                        {
                          newDishType.map((e) => {
                            return(
                                <option key={e} id="diet" value={e}>{e}</option>
                            )
                          })
                        }
                        </CustomSelect>
                        {
                            state.dishType?.map((diet)=>{
                                return(
                                    <div key={diet} className="bg-gray-600 text-gray-900 font-bold rounded-xl px-3 mt-2  flex items-center justify-between w-full">
                                        <p>{diet}</p>
                                        <button className="text-red-800" onClick={()=>onClickDeleteDishType(diet)}>X</button>
                                    </div>
                                    )
                            })
                        }
                 
                  <div >
                    
                
                    <input disabled={Object.keys(props.errors).length != 0 ? true : props.isSubmitting} type="submit" value="Create" onClick={() => onCLick(props.values, props)} className="bg-gray-500 text-gray-800 mt-3 px-3 w-full" />
                    <input type="submit" value="Cancel" onClick={() => onClickCancel(props)} className="bg-gray-500 text-gray-800 mt-3 px-3 w-full" />
                  </div>
                    </Form>
                    </>
                    )
                    }
                </Formik>

                </div>
            </div>
        </div>
    )
}