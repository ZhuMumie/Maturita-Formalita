import { Container, Grid, Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getExercises} from '../../dtb_requests/db';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import {AuthLocalContext} from '../../moduly/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: "theme.palette.text.secondary",
    backgroundColor:"rgb(247, 247, 247)",
    fontSize:"1.5em",

  },
  header:{
    textAlign: 'center',
    fontSize:"4rem",
  },
  listStyle:{
    listStyleType:"none",
  },
  icon:{
    color:"black",
    float:"right",
    paddingLeft:"5px"
  },
  homeKapitoly:{
    paddingTop:"15px",
    

  },
  btn:{
    border:"none",
    float:"right",
    backgroundColor:"rgb(247, 247, 247)",
    
  }

}));


function Exercises(){
    const classes = useStyles();
    const [exercises, setExercises] = useState([])

    const {isAdmin} = React.useContext(AuthLocalContext)
    

    const fetchData = async () =>{
      const data = await firebase.firestore().collection("exercises");
      data.get().then((querySnapshot)=>{
          const tempDoc = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() }
            })
           
            setExercises(tempDoc)
      })
    }
    useEffect(()=>{
        fetchData()
    }, [])

    const deleteData = async (id) =>{
      await firebase.firestore().collection("exercises").doc(id).delete();
      fetchData() 
    }
    

return isAdmin ?(
   <Container className={classes.root}>
       <Grid container spacing={3}>

       <Grid item xs={12}>
          <div className={classes.header}>
          JS Cvičení
          </div>
        </Grid>
       
        <Grid item xs={12}>
        <ul className={classes.listStyle}>
        <Link to="/addExercise" className="underline"> 
          <Paper elevation={2} className={classes.paper} style={{marginBottom:"50px", color:"green"}}>
            Vytvořit  
           <AddIcon fontSize="large" className={classes.icon}></AddIcon>
          </Paper>
          </Link>
        
        {exercises.map(exercises=>(
            
            <div className={classes.homeKapitoly}>
              <li key={exercises.name}>
              <Paper elevation={2} className={classes.paper}>
                <Link className="underline"  underline="none" to={"console/" + exercises.name}>
                  {exercises.name} 
                  </Link>
                  <button className={classes.btn} onClick={() => deleteData(exercises.id)}><DeleteIcon fontSize="large" className={classes.icon} ></DeleteIcon></button>
                  <Link className="underline"  underline="none" to={"editExercise/" + exercises.name}><EditIcon fontSize="large" className={classes.icon}></EditIcon></Link>
              </Paper>
              </li>  
              </div>
            
          ))} 
          </ul>
        </Grid>
       
      </Grid>

       
   </Container>
):(

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
            
            <div className={classes.homeKapitoly}>
              <li key={exercises.name}>
              <Paper elevation={2} className={classes.paper}>
                <Link className="underline"  underline="none" to={"console/" + exercises.name}>
                  {exercises.name} 
                  </Link>
              </Paper>
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