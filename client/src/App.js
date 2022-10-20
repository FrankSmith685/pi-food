import './App.css';
import {Route,Switch} from 'react-router-dom';
import {LadingPage} from './components/LadingPage/LadingPage.jsx';
import { Home } from './components/Home/Home';
import { DetailsRecipe } from './components/DetailsRecipe/DetailsRecipe';
import { CreateRecipe } from './components/CreateRecipe/CreateRecipe';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LadingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/:id" component={DetailsRecipe}/>
      <Route exact path="/createRecipe" component={CreateRecipe} />
    </Switch>
  );
}

export default App;
