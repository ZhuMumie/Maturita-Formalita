import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import  { Controlled } from 'react-codemirror2'
import { makeStyles } from '@material-ui/core/styles';

 function  Reader(props) {
  const {
    value,
    onChange,
    height
  } = props

  
  function handleChange(editor, data, value) {
    onChange(value)
  }
  
  const useStyles = makeStyles((theme) => ({
    CodeMirror: {
      height: height+'!important',
     backgroundColor: "#263238",
    }
  }));
  const classes = useStyles();

  return ( 
    
      
      <Controlled
        
        onBeforeChange={handleChange}
        value={value} 
        className={classes.CodeMirror}
        options={{ 
          lineWrapping: true,
          lint: true,
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
          inputStyle: "textarea",
          viewportMargin:Infinity,
          autofocus:true
          
          
        }}
      />
  
  )
}

export default Reader;