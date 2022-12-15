import {Route,BrowserRouter as Router,Routes} from "react-router-dom";
import LadingPage from "./components/LadingPage/LadingPage";
import Home from "./components/Home/Home";
// import NavBar from "./pages/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRecipes } from "./redux/actions";
import DetailsRecipe from "./components/DetailsRecipe/DetailsRecipe";
import NavBarMain from "./pages/NavBar/NavBarMain";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import About from "./components/About/About";


export default function App() {
  const dispatch=useDispatch();
  const { loading } = useSelector(state => state);
  
  useEffect(()=>{
    return(()=>dispatch(getAllRecipes()));
  },[dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<LadingPage />}/>
        
        <Route path="/home" element={
          <>
              {loading?<p>CARGANDO....</p>:<>
              
              <Home/>
              </>
              } 
          </>

        }/>
        <Route exact path="/home/:id" element={<>
          <NavBarMain />
          <DetailsRecipe/></>
        }/>
        <Route exact path="/addRecipe" element={
          <>
           <NavBarMain />
          <CreateRecipe />
          </>
        }/>
        <Route exact path="/about" element={
          <>
           <NavBarMain />
          <About />
          </>
        }/>
      </Routes>
    </Router>
  )
}

     