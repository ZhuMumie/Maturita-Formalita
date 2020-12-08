
import React, {useState, useEffect, useLayoutEffect} from 'react';
import Reader from '../reader';
import { Interpreter } from '../interpreter';
import { Button, Container, Row, Col, Progress  } from "shards-react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useParams } from "react-router-dom";
import firebase from "firebase";

function Console() {

    //consolovej text, sem přijde před připravenej kód, taky odtud půjde kód co dělá uživatel na testování
    
  const [js, setJs]=useState('')
  const [doc, setDoc]=useState()

  const [description, setDescription] = useState("")
  const { name } = useParams();
  const [exeName, setExeName] = useState("");
  const [testCode, setTestCode] = useState("");

  useLayoutEffect(()=>{
    const fetchData = async () => {
      const db = firebase.firestore()
      db.collection("exercises").where("name", "==", name).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          setJs(doc.data().code)
          setDescription(doc.data().description)
          setExeName(doc.data().name)
          setTestCode(doc.data().test_code)
        })
      } );
      
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
            <Button onClick={render} pill theme="success" className="runBtn">
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