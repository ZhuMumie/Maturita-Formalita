
import React, {useState, useLayoutEffect} from 'react';
import Reader from '../reader'; 
import { Interpreter } from '../interpreter';
import {Row, Col } from "shards-react";
import {useParams } from "react-router-dom";
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

  const [description, setDescription] = useState("")
  const { name } = useParams();
  const [exeName, setExeName] = useState("");
  const [testCode, setTestCode] = useState("");
  const [exercise, setExercise] = useState([])


  useLayoutEffect(()=>{
    const fetchData = async () => {
      const db = firebase.firestore()
      db.collection("exercises").where("name", "==", name).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          
          setJs(doc.data().code)
          setDescription(doc.data().description)
          setExeName(doc.data().name)
          setTestCode(doc.data().test_code)
          console.log(doc.data().uid)
        })
      } );
      
    }
    fetchData();
}, [])
 
// useLayoutEffect(()=>{
//       const fetchExercise = async () =>{
//         setExercise(await getExercise(name))
//       }
//       fetchExercise()
// }, [])

//   console.log(exercise[0]["code"])

  var initFunc = function(interpreter, globalObject) {
    var console = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'console', console);

    var wrapper = function(text) {
      return (text);
    };
    interpreter.setProperty(console, 'log',
        interpreter.createNativeFunction(wrapper));
  };
  
function render(e){
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

const test =(e)=>{
  e.preventDefault();
  

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

          

       </div>
    

  );
}

export default Console;