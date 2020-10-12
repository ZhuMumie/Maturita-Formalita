import React, {useState} from 'react';
import Reader from './components/reader';

function App() {
 
  const [js, setJs]=useState('')

 

  const srcDoc = ` <html>
  <body></body>
  <style></style>
  <script>${js}</script>
</html>
 `

  return (<div class="container">
              
            <Reader value={js} onChange={setJs}/>

          
           <iframe title='output' sandbox='allow-scripts' frameBorder='0' srcDoc={srcDoc} 
           width="100%"
          height="100%">

           </iframe>
          
            
          </div>
    );
}

export default App;
