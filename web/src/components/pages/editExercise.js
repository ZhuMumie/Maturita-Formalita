import React, {useState, useLayoutEffect } from 'react';
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
import {useHistory, useParams } from "react-router-dom";
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
  return ['název a popis cvičení', 'očekávené řešení', 'uživatelský pohled', 'testování'];
}


export default function EditExercise() {
  const [open, setOpen] = React.useState(false);
     
  const { name } = useParams();
  const [checkbox, setcheckbox] = useState();
  const [doc, setDoc]=useState()
  const [js, setJs]=useState("")
  const [exeName, setExeName] = useState("");
  const [description, setDescription] = useState("");
  const [funTest, setFunTest] = useState("");
  //funkce
  const [testResult, setTestResult]= useState("")
  //vysledek v konzoli
  const [funResult, setfunResult] =useState("")
  const [logResult, setLogResult] =useState("")
  const [parse, setParse]= useState(false)
  const [userView, setUserView] = useState()
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [test, setTest] = useState();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTagChange = (event, values) =>{
    setExeTags(values)
  }
  
  
  
  const [subId, setSubId] = useState("")
  const [docId, setDocId] = useState("")
  const [exeTags, setExeTags] = useState([])
  const [tags, setTags] = useState([])
  useLayoutEffect(()=>{
    const fetchData = async () => {
      const db = firebase.firestore()
      var subCol = "";
      var id = "";
      var isFunc = true;
      const tags = firebase.firestore().collection("tags").doc("tags");

      tags.get().then((doc)=>{
       
        setTags(doc.data().tags)
      })
     await db.collection("exercises").where("name", "==", name).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          id= doc.id
            
          setDocId(doc.id)
          setJs(doc.data().code)
          setDescription(doc.data().description)
          setExeName(doc.data().name)
          setUserView(doc.data().userView)
          setcheckbox(doc.data().isFuncTest) 
          setExeTags(doc.data().tags)
          isFunc = doc.data().isFuncTest;
          
         
        })
      } )

      if(isFunc){
        subCol = "test_func";
       }
       else subCol = "test_log";


      var docRef = db.collection('exercises').doc(id).collection(subCol);
      await docRef.get().then((querySnapshot)=>{
        const tempDoc = []
        querySnapshot.forEach((doc)=>{
          tempDoc.push({id: doc.id, ...doc.data()})
        setFunTest(doc.data().test)
          setSubId(doc.id)
        })
      }).catch(function(error){console.log(error)})
      

    }
    fetchData();
    
}, [])

 



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

let history = useHistory()

function editRecord(){
  let newTags = exeTags.filter(x => !tags.includes(x))
  let dbTags = tags.concat(newTags)

  const db = firebase.firestore()
  
  const tagCol = db.collection("tags").doc("tags");
  tagCol.update({
    tags: dbTags
  })
  
  db.collection("exercises").doc(docId).update({
    name:exeName,
    code: js,
    description:description
  }).then(function(docRef){

  var subColName = "";
  if(checkbox){
   subColName = "test_func";
  }
  else subColName = "test_log";

   const subcol = db.collection("exercises").doc(docId).collection(subColName).doc(subId);
    subcol.update({
      test: funTest   
    }) 
    
    
     history.push("/exercises");
  }).catch(function(error){
    console.log(error)
    setOpen(true)
  });
}



const handleAlert = () =>{
  setOpen(true)
}

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


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
              <FormGroup onChange={(e)=> setExeName(e.target.value)}>
              <label htmlFor="ExerciseName">jmeno cviceni</label>
              <FormInput value={exeName}></FormInput>
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
        value={exeTags}
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
            '2':  <div>
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
              
                  <Grid container
                     direction="row"
                    justify="space-between">
                    <Button
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                      size="large"
                      style={{marginTop:'10px'}}
                      
                      >
                        Zpět
                    </Button>

                    <Button variant="contained" color="primary" size="large" onClick={handleNext} style={{marginTop:'10px'}}>
                      Pokračovat
                    </Button>
                  </Grid>

                </Grid>

               </Grid>

            </Grid>
        

          </div>,
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

                          <Button variant="contained" color="primary"  size="large" onClick={editRecord}>
                            upravit zadání
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
                    message="doslo k chybe pri vytváření"
                    action={
                      <React.Fragment>
                         <CloseIcon fontSize="small" />
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
                        <FormInput id="logResult" placeholder="výstup" onChange={(e)=> setFunTest(e.target.value)} value={funTest} />
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

                          <Button variant="contained" color="primary"  size="large" onClick={editRecord}>
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
                    message="vytvoreno"
                    action={
                      <React.Fragment>
                         <CloseIcon fontSize="small" />
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
