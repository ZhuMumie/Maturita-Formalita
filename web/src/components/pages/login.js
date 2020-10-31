import React from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";

function Login() {
  return (
    <Container style={{paddingTop:"20px"}}>
    <Form>
      <h2>Login In</h2>
    <FormGroup>
      <label htmlFor="#username">Username</label>
      <FormInput id="#username" placeholder="Username" />
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