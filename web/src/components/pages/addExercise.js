import React, {useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import AddForm from '../addForm';
import { Row, Col, Progress,  Form, FormInput, FormGroup, FormTextarea,  FormCheckbox  } from "shards-react";
import { Interpreter } from '../interpreter';
import  Reader from '../reader';
import ReactDOM from 'react-dom'
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  console: {
    height:"100%",
  },
}));

function getSteps() {
  return ['název a popis cvičení', 'očekávené řešení', 'testování'];
}


export default function AddExercise() {

     

  const [doc, setDoc]=useState()
  const [js, setJs]=useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [funTest, setFunTest] = useState("myFunction(2,2)");
  //funkce
  const [testResult, setTestResult]= useState("")
  //vysledek v konzoli
  const [funResult, setfunResult] =useState("")
  const [parse, setParse]= useState(false)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };




  const [checkbox, setcheckbox] = useState(false);

 
  function handleCheckBox(e, fruit){
    if(checkbox) setcheckbox(false)
    else
    setcheckbox(true); 

  }

  var initFunc = function(interpreter, globalObject) {
    var console = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'console', console);

    var wrapper = function(text) {
      return (text);
    };
    interpreter.setProperty(console, 'log',
        interpreter.createNativeFunction(wrapper));
  };
  
function renderSolution(e){
  e.preventDefault();
  try{
    var myInterpreter = new Interpreter(js.trim(), initFunc);
      
    if(myInterpreter.run())
    {
      
    }
  
     setDoc(myInterpreter.value);
  
   
  }
  catch(error){
      setDoc(String(error));
  }
 
}  
  function handleBtnChange(e){
    setFunTest(e)
    setfunResult(js + funTest)
    console.log(funResult)
  }


 function renderTest(e){
  if(parse)setParse(false) 
  else setParse(true)
  e.preventDefault();

   
    setfunResult(js +funTest)
    try{
    var myInter = new Interpreter(funResult.trim(), initFunc);
      
    if(myInter.run())
    {
      
    }
     setTestResult(myInter.value);

  }
  catch(error){
      setTestResult(String(error));
  }
 
}
function createRecord(){
  const db = firebase.firestore()
  db.collection("exercises").add({
    name:name,
    code: js,
    description:description,
    test_code:funTest
  }).then(function(docRef){
    console.log("vytvoreno")
  }).catch(function(error){
    console.log(error)
  });
}



  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}

      </Stepper>
      
      <div>

        <Container>
        {{
            '0':
            <div> 
            <Form>
              <FormGroup onChange={(e)=> setName(e.target.value)}>
              <label htmlFor="ExerciseName">jmeno cviceni</label>
              <FormInput />
              </FormGroup>
              <FormGroup onChange={(e)=> setDescription(e.target.value)}>
              <label htmlFor="description">popis cviceni</label>
              <FormTextarea ></FormTextarea>
              </FormGroup>
              <FormGroup>
              <label></label>
              <FormCheckbox checked={checkbox} onChange={(e)=> handleCheckBox(e, "function")}>vysledek cviceni je funkce</FormCheckbox>
              </FormGroup>
            </Form>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
              size="large"
            >
            Zpět
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
            Pokračovat
            </Button>
           </div>
            ,

            '1':
                <div>
                  <div className="topText">
                    vytvořte výsledek zadání
                  </div>

                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Reader value={js} onChange={setJs} height="400px" />
                    </Grid>

                    <Grid item xs={6}>
                      <div className="outputConsole">
                          {""}
                      {'>'} {doc}
                    </div>

                      <Grid container
                        direction="row"
                        justify="space-between"
                        
                      >
                        <Grid>
                          <Button onClick={renderSolution}  variant="contained" size="large" className={classes.backButton}>
                            run
                          </Button> 
                        </Grid>

                        <Grid>
                          <Button
                            variant="contained"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                            size="large"
                            >
                              Zpět
                          </Button>

                          <Button variant="contained" color="primary" size="large" onClick={handleNext}>
                            Pokračovat
                          </Button>
                        </Grid>

                      </Grid>

                     </Grid>

                  </Grid>
                </div>
          

            ,
            '2': <div>
                  {true ? (
                  <>
                  <div className="topText">
                      vytvořte kotrolu pro správnost cvičení
                  </div>                    
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Reader value={js} onChange={setJs} height="400px"  />
                        <br></br>
                        <Reader value={funTest} onChange={setFunTest} height="200px" />
                    </Grid>

                    <Grid item xs={6}>
                      <div className="outputConsole">
                        {""}
                      {'>'} {testResult}
                      </div>
                      v druhém poli vytvořte funkce na kontrolu vašeho cvičení, funkce vyzkoušejte a při neočekávané odpovědi opravte výsledek zadání
                      <Grid container
                        direction="row"
                        justify="space-between"
                        
                      >
                        <Grid>
                          <Button onClick={renderTest}  variant="contained" size="large" className={classes.backButton}>
                          {parse ? (<>run</>) : (<>parse</>)}  
                          </Button> 
                        </Grid>

                        <Grid>
                          <Button
                            variant="contained"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                            size="large"
                            >
                              Zpět
                          </Button>

                          <Button variant="contained" color="primary"  size="large" onClick={createRecord}>
                            Vytvořit zadání
                          </Button>
                        </Grid>

                      </Grid>
                    </Grid>

                  </Grid>


                    
                  </>       
                  ) : (<></>)}

                  
                
                


                </div>
        }[activeStep]
        }

        </Container>



         {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (

          <div>
            
          </div>
        )} 
      </div>
    </div>
  );
}
