import {useField} from "formik";

const CustomTextArea=({label,...props})=>{
    const [field,meta]=useField(props);
    return(
        <div className="">
            <label className="text-gray-500 font-bold px-2 ">{label}</label>
            <textarea {...field} {...props}
            className={meta.touched && meta.error ? "focus:border-red-600 border-solid border-red-600 border-2 rounded-xl w-full px-2 py-1 mt-1 placeholder:text-slate-400 outline-none":"focus:border-orange-500 border-solid border-gray-400 border-2 rounded-xl h-40 w-full  px-2 py-1 mt-1 placeholder:text-slate-400 outline-none"}
            />
            {meta.touched && meta.error && <div className="text-red-600 px-2">{meta.error}</div>}
        </div>
    )
}

export default CustomTextArea;