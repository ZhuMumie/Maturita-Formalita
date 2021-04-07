
import React, {useState, useLayoutEffect} from 'react';
import Reader from '../reader'; 
import { Interpreter } from '../interpreter';
import {Row, Col } from "shards-react";
import {useParams } from "react-router-dom";
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {AuthLocalContext} from '../../moduly/authContext';
import * as Babel from '@babel/standalone'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  runBtn:{
    backgroundColor:"#0ca800",
    marginRight: theme.spacing(1),
    color:"white",
    padding:"calc(1vw + 1vh)",
    paddingLeft:"calc(1.5vw + 1.5vh)",
    paddingRight:"calc(1.5vw + 1.5vh)",
    marginTop:"5px",
    '&:hover':{
      backgroundColor: '#0db800',
  
    }

  }
}));


function Console() {
 



    //consolovej text, sem přijde před připravenej kód, taky odtud půjde kód co dělá uživatel na testování
    const classes = useStyles();
 
  const [js, setJs]=useState('')
  const [doc, setDoc]=useState()
  const [ans, setAns] = useState('')
const [id, setId] = useState()
  const [description, setDescription] = useState("")
  const { name } = useParams();
  const [exeName, setExeName] = useState("");
  const [testCode, setTestCode] = useState("");

  const [exercise, setExercise] = useState([])
  //todo p5edelat lmao takhle to nema bejt

  const [isFunc, setIsFunc] = useState()


  const db = firebase.firestore()

  const {currentUser} = React.useContext(AuthLocalContext)
  
  var getExercise = firebase.functions().httpsCallable("getExercise");

  useLayoutEffect(()=>{
    var isFunc;

    const aaa = async (exe) =>{
   
    getExercise({exeName: exe}).then((result)=>{
      console.log(result.data)
    })
  
    }
  

    const fetchData = async () => {
      
     await db.collection("exercises").where("name", "==", name).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          
          setAns(doc.data().code)
          setDescription(doc.data().description)
          setExeName(doc.data().name)
          setIsFunc(doc.data().isFuncTest)
          isFunc = doc.data().isFuncTest
          setId(doc.id)
          setJs(doc.data().userView)
          aaa(doc.data().name)
          
          
        const subCol = db.collection("exercises").doc(doc.id).collection(isFunc ? ("test_func"):("test_log"));

        subCol.get().then(function(subDoc){
          if (subDoc.docs[0].exists) {
            setTestCode(subDoc.docs[0].data().test)
        } else {
            console.log("naser si");
        }
    
        })
        })
      } );
      
    }

    fetchData();
}, [])

const [open, setOpen] = useState(false)

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    setOpen(false);
  }

  setOpen(false);
};
 

  const [consoleLog, setConsoleLog] = useState([])

  var initFunc = function(interpreter, globalObject) {
    var console = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'console', console);

    var wrapper = function(text) {
      setConsoleLog(consolelog => [...consolelog, text]);
      return text;
    };
    interpreter.setProperty(console, 'log',
        interpreter.createNativeFunction(wrapper));
  };
  
function render(e){
  e.preventDefault();
  try{
    var output = Babel.transform(js, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;
    setConsoleLog([])
    var myInterpreter = new Interpreter(output.trim(), initFunc);

    function nextStep() {
      if (myInterpreter.step()) {
        window.setTimeout(nextStep(), 0);
      }
    }
 
    nextStep()
 

      if(js.trim()!=undefined){ 
     setDoc(String(myInterpreter.value));
        // if(myInterpreter.value==consoleLog[consoleLog.length - 1])
        // {
        //   setDoc(consoleLog)
        // }
      }
 
      
  }
  catch(error){
      setDoc(String(error));
  }
  
}


   
    var updateProgression = firebase.functions().httpsCallable('updateProgression')
    
 


 


  const checkCode = () =>{
  

      setDoc(" ")
    if(isFunc)
    { 

    var field = testCode.split(/\n/).filter((el) => el !== '')
    
    try{   
      var test;
      var i=0;
      for(test of field)
      { //musím stepovat
        var output = Babel.transform(ans, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;
        var finalCode = new Interpreter(output.trim() + test, initFunc);
        finalCode.run();  
      
  
        var Useroutput = Babel.transform(js, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;
        var userCode = new Interpreter(Useroutput.trim() + "\n " + test, initFunc);
        userCode.run();

  
        
        if(finalCode.value !== userCode.value)
        {
          setDoc("kód selhal na testu: " + test) 
          break
        }
        
        else{
          i++
          if(field.length==i)
          {
            setOpen(true)
            updateProgression({exeId:id}).catch((error)=>{
              console.log(error)
            })
            //pridat checkmark
          }
        }


      }
   }
   catch(error){

    setDoc(String(error));
   }
   }
   else{
    try{
      var output = Babel.transform(js, { plugins: ['transform-classes', 'transform-block-scoping'] }).code;
      var userCode = new Interpreter(output.trim(), initFunc);
      userCode.run();


      if(userCode.value==testCode)
      {
        setOpen(true)
        updateProgression({exeId:id}).catch((error)=>{
          console.log(error)
        })
      }
      
      else{
        
       setDoc("takhle ne")
      }

    }
    catch(error){

    setDoc(String(error));
   }
   }
  }


 

  return (

  
            <div className="console">
           
            <Row style={{margin:"0px", height:"80vh"}}>
            
              <Col sm="12" lg="6" >
            <Reader value={js} onChange={setJs} height="500px" />



           
            </Col>
           
            <Col sm="12" lg="6" >
            
            <div className="outputConsole">
              {exeName}<br></br>
             {'>'} {doc}
            </div>
            <Button onClick={render}  className={classes.runBtn}>
                run
            </Button> 
            <Button onClick={checkCode}  className={classes.runBtn}>
                Odevzdat
            </Button> 
            <div className="zadaniText">
              {description}
            </div>
           {/* <iframe  title='output' frameBorder='0' srcDoc={doc}
            height="100%"
            width="100%"
          >
            
           </iframe> */}
  
           </Col>
           </Row>

           <Snackbar
                anchorOrigin={{
                   vertical: 'bottom',
                 horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message="cvičení úspěšne splněno"
                action={
                <React.Fragment>
                   <CloseIcon fontSize="small" onClick={handleCloseAlert} />
                </React.Fragment>
               }
            />

       </div>
    

  );
}
  
export default Console;