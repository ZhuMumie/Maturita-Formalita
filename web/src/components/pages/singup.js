import React, {useState, useContext} from "react";
import { Form, FormInput, FormGroup, Container, Button, Alert, Navbar } from "shards-react";
import firebase from 'firebase';
import {Redirect, Route} from 'react-router-dom';
import Navibar from '../navbar';
import {AuthLocalContext} from '../../moduly/authContext';


function Singup(props) {

  const [hasAccount, setHasAccount]= useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const {currentUser,
  singup,
  login,
  microSingUp} = React.useContext(AuthLocalContext)

  const clearError = () =>{
    setError('')

  }

  function handleSingup(){
    clearError();
    singup(email, password).catch(err=>{
      switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          case"auth/weak-password":
          setError(err.message);
          break;
        }
      });

    }

    
  function handleLogin(){
    clearError();
    login(email, password).then((user)=>{
    
    }).catch(err=>{
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        case"auth/wrong-password":
        setError(err.message);
        break;
      }
    });

    }


  
  return currentUser ?( 
    <div>
          <Navibar></Navibar>
          <Container>
          You are already logged in
          </Container>
    </div>
  ) 
  : 
  (
    <Container style={{paddingTop:"20px"}}>
    <Form required>
      {hasAccount ? (<h2>Sing up</h2>) : (<h2>Log in</h2>)}


   
      <FormGroup >
        
      <label>Email</label>
      <FormInput id="#email" placeholder="Email" type="email" required  onChange={(e)=> setEmail(e.target.value)}/>
    </FormGroup>


    <FormGroup>
      <label>Password</label>
      <FormInput id="#password" placeholder="Password"  type="password" required onChange={(e)=> setPassword(e.target.value)}/>
    </FormGroup>

    {error ?(
       <>
    <Alert theme="primary">
    {error}
    </Alert>
       </> 
    ) : (
      <>
        
      </>
    )}
    <p><span style={{cursor:"pointer"}} onClick={()=>microSingUp()}>log in with Microsoft</span></p> 
    {hasAccount ?( 
      <>
       <p>have an Account? <span style={{cursor:"pointer"}} onClick={()=>setHasAccount(!hasAccount)}>Log in</span> </p>
    <Button  theme="secondary" onClick={handleSingup}>Sing up</Button>
    </>
    ) : (
      <>
      <p>Don't have an Account? <span style={{cursor:"pointer"}}  onClick={()=>setHasAccount(!hasAccount)}>Sign up</span> </p>
      <Button theme="secondary" onClick={handleLogin}>Log in</Button>
      </>
    )
    
    }
    

  </Form>
  </Container>
  );

}

export default Singup;