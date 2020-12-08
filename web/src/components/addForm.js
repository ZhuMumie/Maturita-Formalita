import React, {useState} from "react";
import { Button, Container, Row, Col, Progress,  Form, FormInput, FormGroup, FormTextarea,  FormCheckbox  } from "shards-react";
import ReactDOM, {Link} from "react-router-dom";



function AddForm() {

  const [checkbox, setcheckbox] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChange(e, fruit){
    if(checkbox) setcheckbox(false)
    else
    setcheckbox(true); 

  }


  function handleData(){
    
    //preposle data dalsi komponente na zpracovani a zapsani do dtb, podle function checkboxu se upravi stranka na pridani kontroly

  }




  return ( 
    <Container style={{paddingTop:"20px"}}>
    <Form>
    <FormGroup onChange={(e)=> setName(e.target.value)}>
      <label htmlFor="ExerciseName">jmeno cviceni</label>
      <FormInput />
    </FormGroup>
    <FormGroup>
      <label htmlFor="description">popis cviceni</label>
      <FormTextarea onChange={(e)=> setDescription(e.target.value)}></FormTextarea>
    </FormGroup>
    <FormGroup>
      <label></label>
      <FormCheckbox checked={checkbox} onChange={(e)=> handleChange(e, "function")}>cviceni obsahuje funkci</FormCheckbox>
    </FormGroup>
  </Form>
  <Button theme="secondary" onClick={handleData}>pokračovat</Button>
  </Container>

  );
}

export default AddForm;