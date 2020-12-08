import { Container, Grid, Button, Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getExercises} from '../../dtb_requests/db';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor:"rgb(247, 247, 247)"
  },
  header:{
    textAlign: 'center',
    fontSize:"4rem",
  },
  listStyle:{
    listStyleType:"none",
  },

}));

function Exercises(){
    const classes = useStyles();
    const [exercises, setExercises] = useState([])

    useEffect(()=>{
        const fetchExe = async () => {
         setExercises(await getExercises())
        }
        fetchExe();
    }, [])

return(
   <Container className={classes.root}>
       <Grid container spacing={3}>

       <Grid item xs={12}>
          <div className={classes.header}>
          JS Cvičení
          </div>
        </Grid>
       
        <Grid item xs={12}>
           <ul className={classes.listStyle}>
        {exercises.map(exercises=>(
            <div className="home-kapitoly">
                
              <li key={exercises.name}>
                <Link className="underline"  underline="none" to={"console/" + exercises.name}><Paper elevation={2} className={classes.paper}>{exercises.name}</Paper></Link>
              </li>  
  
            </div>
          ))}
          </ul>
        </Grid>
       
      </Grid>

       
   </Container>
);
}

export default Exercises;