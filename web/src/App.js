import React, {useState, useEffect} from 'react';
import Reader from './components/reader';
import Singup from './components/pages/singup';
import Home from './components/pages/index';
import EditExercise from './components/pages/editExercise';
import Console from './components/pages/console';
import AddForm from './components/addForm';
import  AddExercise from './components/pages/addExercise';
import  Exercises from './components/pages/exercises';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import fire from './components/fire';
import  ProtectedRouter  from './components/ProtectedRoute.js';
import {AuthContext} from './moduly/authContext';


function App() {

  
  return ( 

    <div >
      <AuthContext.Provider>
        <Router >     
          <Switch>
            {/* protected routy */}
           <Route path="/signup" > <Singup></Singup> </Route>
           <ProtectedRouter path="/" exact={true} component={Home} ></ProtectedRouter>
           <ProtectedRouter path="/console/:name"  component={Console} ></ProtectedRouter>
           <ProtectedRouter path="/addExercise" exact={true} component={ AddExercise} ></ProtectedRouter>
           <ProtectedRouter path="/editExercise/:name"  component={EditExercise} ></ProtectedRouter>
           <ProtectedRouter path="/exercises" exact={true} component={ Exercises} ></ProtectedRouter>
          </Switch>
          
        </Router>

      
      </AuthContext.Provider>
    </div> 
  );
}

export default App;
