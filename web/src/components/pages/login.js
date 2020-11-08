import React from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";

function Login(props) {
  const {} = props

  return (
    <Container style={{paddingTop:"20px"}}>
    <Form>
      <h2>Login In</h2>
    <FormGroup>
      <label>Email</label>
      <FormInput id="#email" placeholder="Email" type="emial"/>
    </FormGroup>
    <FormGroup>
      <label htmlFor="#password">Password</label>
      <FormInput type="password" id="#password" placeholder="Password"/>
    </FormGroup>
    <Button  theme="secondary">Login</Button>
  </Form>
  </Container>
  );
}

export default Login;