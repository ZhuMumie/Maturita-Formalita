import React, {useState} from 'react';
import { Interpreter } from './components/interpreter';
import Reader from './components/reader';




function App() {

  const [js, setJs]=useState('')
  const [doc, setDoc]=useState()
  
 
  var initFunc = function(interpreter, globalObject) {
    var wrapper = function(text) {
      return text;
    };
    interpreter.setProperty(globalObject, 'consoleLog',
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
  
    console.log(doc)
  }
  catch(error){
      setDoc(error);
  }

}


 
  
  return (<div className="container">
              <button onClick={render}>
                run
              </button> 
            <Reader value={js} onChange={setJs}/>

          
           <iframe  title='output' sandbox='allow-scripts' frameBorder='0' srcDoc={doc}
           width="100%"
          height="100%">

           </iframe>
          
            
          </div>
    );
}

export default App;
