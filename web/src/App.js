import React, {useState} from 'react';
import { Interpreter } from './components/interpreter';
import Reader from './components/reader';
import Login from './components/pages/login';
import Singup from './components/pages/singup';
import Home from './components/pages/index';
import Console from './components/pages/console';
import Navibar from './components/navbar';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


function App() {



  
  return (<div > <Router>
    
                <Navibar> </Navibar>
              
        <Switch>
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/" exact component={() => <Home />} />
          <Route path="/singup" exact component={() => <Singup />} />
          <Route path="/console" exact component={() => <Console />} />
        </Switch>

      </Router>


          </div>
    );
}

export default App;
