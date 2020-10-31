
import React, {useState} from 'react';
import Reader from '../reader';
import { Interpreter } from '../interpreter';
import { Button, Container, Row, Col, Progress  } from "shards-react";

function Console() {

    
  const [js, setJs]=useState('//console')
  const [doc, setDoc]=useState()
  

 
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
            <Reader value={js} onChange={setJs} />

           

           
            </Col>
           
            <Col sm="12" lg="6" >
            
            <div className="outputConsole">
              {'kapitola jmeno'}<br></br>
             {'>'} {doc}
            </div>
            <Button onClick={render} pill theme="success" className="runBtn">
                run
            </Button> 
            <div className="zadaniText">
                Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.

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