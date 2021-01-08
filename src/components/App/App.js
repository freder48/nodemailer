import './App.css';
import SupportForm from '../SupportForm/SupportForm'
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
function App() {
  return (
    <div >
  
      <Router>
       
        <Switch>
         
          <Route path='/' component={SupportForm}/>
        
        </Switch>

      </Router>
    </div>
  );
}

export default App;
