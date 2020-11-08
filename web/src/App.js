import React, {useState, useEffect} from 'react';
import Reader from './components/reader';
import Login from './components/pages/login';
import Singup from './components/pages/singup';
import Home from './components/pages/index';
import Console from './components/pages/console';
import Navibar from './components/navbar';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import fire from './components/fire';

import firebase from 'firebase';

function App() {


  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] =useState('');
  const [hasAccount, setHasAccount]= useState(false);


  const microSingUp = () =>{
    var provider = new firebase.auth.OAuthProvider('microsoft.com');

    provider.setCustomParameters({
      // Force re-consent.
      prompt: 'select_account',
      tenant: '81d89366-7747-4fe5-a737-97f57d0c18ec'
  
    });

    fire.auth().signInWithPopup(provider)
    .catch(function(error) {
      // Handle error.
    });
  }

  const handleLogin = () =>{
    clearError();
    fire.auth().signInWithEmailAndPassword(email, password).catch(err=>{
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        setEmailError(err.message);
        break;
        case"auth/wrong-password":
        setPasswordError(err.message);
        break;
      }
    })
  }

  const handleSingup = () =>{
    clearError();
    fire.auth().createUserWithEmailAndPassword(email, password).catch(err=>{
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        setEmailError(err.message);
        break;
        case"auth/weak-password":
        setPasswordError(err.message);
        break;
      }
    })
  }

  const handleLogout = () =>{
    fire.auth().signOut();
  }

  const authListener = () =>{
    fire.auth().onAuthStateChanged(user=>{
      if(user)
      { clearInput('');
        setUser(user);
      }
      else{
        setUser('');
      }
    })

  }

  useEffect(() =>{
    authListener();
  }, [])

  const clearInput = () =>{
    setEmail('')
    setPassword('')
  }

  const clearError = () =>{
    setEmailError('')
    setPasswordError('')
  }

  return ( 
          <div > <Router>
             
             {/* <Route path="/" exact> */}
            {   
              user ? ( <Navibar handleLogout={handleLogout}></Navibar> 
              ):(
                <Singup
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSingup={handleSingup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                setEmailError={setEmailError}
                handleLogin={handleLogin}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                microSingUp={microSingUp}
                >
                    
                </Singup>
              )
            }
            {/* </Route> */}
    
        
          <Switch>
       
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/home" exact component={() => <Home />} />
          <Route path="/console" exact component={() => <Console />} />
        </Switch>

      </Router>

        

      </div>
    );
}

export default App;
