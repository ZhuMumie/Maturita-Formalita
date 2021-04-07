import React, {useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Snackbar } from '@material-ui/core';
import {  Form, FormInput, FormGroup, FormTextarea,  FormCheckbox  } from "shards-react";
import { Interpreter } from '../interpreter';
import  Reader from '../reader';
import firebase from "firebase"
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";
import {getExercise, getExercises, getExerByName, giveExeOrder} from '../../dtb_requests/db';
import * as Babel from '@babel/standalone'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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
  return ['název a popis cvičení', 'očekávené řešení','uživatelský pohled' ,'testování'];
}



export default function AddExercise() {

  var getOrder = firebase.functions().httpsCallable('getOrder');

  const [exercises, setExercise] = useState()
  
  const [isLoading, setIsLoading] = useState(false);

  const [exerciseOrder, setExerciseOrder] = useState()
  const [tags, setTags] = useState([])
  useLayoutEffect(()=>{
   const getData = async () =>{
      setExercise(await getExercises());
    
    setExerciseOrder(await giveExeOrder()+1)
   
   }
    getData();

    const tags = firebase.firestore().collection("tags").doc("tags");

    tags.get().then((doc)=>{
     
      setTags(doc.data().tags)
    })
  }, [])

 
  let history = useHistory();     
//cely je to spatne, neni cas predelat
  const [doc, setDoc]=useState()
  const [js, setJs]=useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [funTest, setFunTest] = useState("myFunction(2,2)");
  //funkce
  const [testResult, setTestResult]= useState("")
  //vysledek v konzoli
  const [funResult, setfunResult] =useState("")
  const [logResult, setLogResult] =useState("")
  const [parse, setParse]= useState(false)
  const [message, setMessage] = useState("")
  const [userView, setUserView] = useState("")
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
  const [required, setRequired] = useState(false)
 
  function handleCheckBox(e, fruit){
    if(checkbox) setcheckbox(false)
    else
    setcheckbox(true); 

  }

  const handleReq = () =>{
    if(required) setRequired(false)
    else setRequired(true)
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
    var output = Babel.transform(js, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;

    var myInterpreter = new Interpreter(output.trim(), initFunc);
      
    if(myInterpreter.run())
    {
      
    }
  
     setDoc(String(myInterpreter.value));
  
   
  }
  catch(error){
      setDoc(String(error));
  }
 
}  
  function handleBtnChange(e){
    setFunTest(e)
    setfunResult(js + funTest)
 
  }


 function renderTest(e){
  if(parse)setParse(false) 
  else setParse(true)
  e.preventDefault();

   
    setfunResult(js + funTest)
    try{
    
      var output = Babel.transform(funResult, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;

    var myInter = new Interpreter(output.trim(), initFunc);
      
    if(myInter.run())
    {
      
    }
     setTestResult(String(myInter.value));

  }
  catch(error){
      setTestResult(String(error));
  }
 
}



async function createRecord(){
  let newTags = addedTags.filter(x => !tags.includes(x))
  let dbTags = tags.concat(newTags)
  
  if(await getExerByName(name))
  {
    setMessage("jmeno funkce musi byt unikatni")
    setOpen(true)
  }
  else{
    const db = firebase.firestore()

    const tagCol = db.collection("tags").doc("tags");
    tagCol.update({
      tags: dbTags
    })
    
    db.collection("exercises").add({
      name:name,
      code: js,   
      description:description,
      isFuncTest:checkbox,
      isRequired:required,
      exeOrder:exerciseOrder,
      userView:userView,
      tags:addedTags
    }).then(function(docRef){
  
    var subColName = "";
    if(checkbox){
     subColName = "test_func";
    }
    else subColName = "test_log";
    
     const subcol = db.collection("exercises").doc(docRef.id).collection(subColName);
      subcol.add({
        test: funTest
      }) 
  
      history.push("/exercises");
    }).catch(function(error){
    
      setMessage("doslo k chybe pri vytvareni")
      setOpen(true)
      
    });

  }
  
}

const [open, setOpen] = React.useState(false);

const handleAlert = () =>{
  setOpen(true)
}

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    setOpen(false);
  }

  setOpen(false);
};

const [addedTags, setAddedTags] = useState([])
const handleTagChange = (event, values) =>{
  setAddedTags(values)
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
              <FormInput value={name} />
              </FormGroup>
              <FormGroup onChange={(e)=> setDescription(e.target.value)}>
              <label htmlFor="description">popis cviceni</label>
              <FormTextarea value={description} ></FormTextarea>
              </FormGroup>
            
              <Autocomplete
        multiple
        id="tags-filled"
        options={tags}
        freeSolo
        value={addedTags}
        onChange={handleTagChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="tags" placeholder="filter" />
        )}
      />
  







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
            '2':<>
            <div>
                  <div className="topText">
                  vytvořte pohled uživatele
                  </div>

                  <Grid container  justify="center">
                  <Grid item xs={6} >
                      <Reader value={userView} onChange={setUserView} height="400px" />
                   

                    
                      

                      <Grid container
                        direction="row"
                        justify="space-between"
                        
                      >
                    
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
          
            </>,
            '3': <div>
                  {checkbox ? (
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
                    
                    <Snackbar
                     anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    message={message}
                    action={
                      <React.Fragment>
                         <CloseIcon fontSize="small" onClick={handleCloseAlert} />
                      </React.Fragment>
                    }
                    />
                      
                   
                  </Grid>


                    
                  </>       
                  ) : (<>
                <div className="topText">
                      vytvořte kotrolu pro správnost cvičení
                </div> 
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Reader value={logResult} onChange={setLogResult} height="400px"  />
                        <br></br> 

                    </Grid>

                    <Grid item xs={6}>
                   
                    <Grid container
                         direction="column"
                         justify="space-between"
                         alignItems="strech"
                         spacing={5}
                    >
                      <Grid item xs={6}>
                      <Form>
                       <FormGroup>
                        <label htmlFor="text">očekávaný výstup</label>
                        <FormInput id="logResult" placeholder="výstup" onChange={(e)=> setFunTest(e.target.value)} />
                      </FormGroup>
                    </Form>
                    zadejte očekávaný výstup konzole
                    </Grid>
                     
                    

                        <Grid item xs={6}>
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
                       
                    <Snackbar
                     anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    message={message}
                    action={
                      <React.Fragment>
                         <CloseIcon fontSize="small"   onClick={handleCloseAlert}/>
                      </React.Fragment>
                    }
                    />

                   
                  </Grid>

                  </>)}


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
