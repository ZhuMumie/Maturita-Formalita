import React from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";


function Singup() {
  return (
    <Container style={{paddingTop:"20px"}}>
    <Form>
      <h2>Log In</h2>
      <FormGroup>
      <label htmlFor="#email">Email</label>
      <FormInput id="#email" placeholder="Email" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="#username">Username</label>
      <FormInput id="#username" placeholder="Username" />
    </FormGroup>
    <FormGroup>
      <label htmlFor="#password">Password</label>
      <FormInput type="password" id="#password" placeholder="Password"/>
    </FormGroup>
    <FormGroup>
      <label htmlFor="#passwordAg">Password again</label>
      <FormInput type="passwordAg" id="#passwordAg" placeholder="Password"/>
    </FormGroup>
    <Button  theme="secondary">Sing up</Button>
  </Form>
  </Container>
  );

}

export default Singup;