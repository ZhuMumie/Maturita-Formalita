import React from "react";
import { Form, FormInput, FormGroup, Container, Button, Alert } from "shards-react";


function Singup(props) {

  const {emial, 
    setEmail, 
    password, 
    setPassword, 
    handleLogin, 
    handleSingup, 
    setHasAccount, 
    hasAccount, 
    emailError, 
    passwordError,
    microSingUp} = props


  return (
    <Container style={{paddingTop:"20px"}}>
    <Form required>
      {hasAccount ? (<h2>Sing up</h2>) : (<h2>Log in</h2>)}
      <FormGroup >
      <label>Email</label>
      <FormInput id="#email" placeholder="Email" type="email" required onChange={(e)=> setEmail(e.target.value)}/>
    </FormGroup>
    {emailError ?(
       <>
    <Alert theme="primary">
    {emailError}
    </Alert>
       </> 
    ) : (
      <>
        
      </>
    )}
   
    <FormGroup>
      <label>Password</label>
      <FormInput id="#password" placeholder="Password"  type="password" required onChange={(e)=> setPassword(e.target.value)}/>
    </FormGroup>
    {passwordError ?(
       <>
    <Alert theme="primary">
    {passwordError}
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