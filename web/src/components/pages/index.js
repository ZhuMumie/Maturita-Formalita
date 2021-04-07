import React, {useState, useEffect, useLayoutEffect} from "react";
import LoadBar from '../loadbar';
import { Link } from "react-router-dom";
import { Container, Grid, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getExercises, getExercise, getCurrentExercise} from '../../dtb_requests/db'
import {AuthLocalContext} from '../../moduly/authContext';
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeBlock: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: "rgb(223, 223, 223)",
    height:"100%"
  },
  blockText:{
    fontSize: "calc(1.5vw + 1.5vh)",
  },  
  headerText: {
    fontSize: "calc(3vw + 3vh)",
  },
  continueBtn:{
    margin:"5px",
    backgroundColor:"rgb(250, 250, 250)",
    padding:"calc(0.5vw + 0.5vh)",
    paddingLeft:"calc(1vw + 1vh)",
    paddingRight:"calc(1vw + 1vh)",
    borderRadius:"5%"
  },
  homeContent:{
    padding: "calc(0.5vw + 0.5vh)",
    fontSize:"1.2em"
  },
  aHref:{
    '&:hover':{
      textDecoration:"none",
      
    },
    color:"#43494f",
  },
  link :{
    listStyleType:"none",
  
  }
}));


function Home() {

  const { currentUser
  } = React.useContext(AuthLocalContext)
  
  const [currentExe, setCurrentExe]=  useState();
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);
const [newUser, setNewUser] = useState(false)
useLayoutEffect(()=>{

      const fetchUsers = async () => {
       setExercises(await getExercises())
       
       
      }
      const getExeLink = async () =>{
        const db = firebase.firestore();
         db.collection("users").doc(currentUser.uid).get().then((doc)=>{
           if(doc.data().current_exercise_id == " ")
           {
             
             setNewUser(true)
           }
           else{
          db.collection("exercises").doc(doc.data().current_exercise_id.trim()).get().then((exeDoc)=>{
            setCurrentExe(exeDoc.data().name)
          });

        }
        });
      
       

      }
      fetchUsers();
      getExeLink()
  }, [])

 

  return (    
 
          <div className={classes.root}>
      <Container maxWidth="lg">
        
      <Grid container>
      <Grid item xs={12} className={classes.homeBlock}>
        {newUser ? (<>
         

          <div className={classes.headerText}>
            Začít programovat
          </div>
          <div>
            <Link to="/exercises" className="underline"  underline="none">
          <Button color="inherit" size="large" className={classes.continueBtn} >úlohy</Button>
          </Link>
          </div>
         
        </>) : (<>
          <div className={classes.blockText}>
            cvičení
          </div>

          <div className={classes.headerText}>
            {currentExe}
          </div>
          <div>
            <Link to={"console/" + currentExe} className="underline"  underline="none">
          <Button color="inherit" size="large" className={classes.continueBtn} >pokračovat</Button>
          </Link>
          </div>
        </>)}
         
      </Grid>

      <Grid item xs={12} sm={12} className={classes.homeContent} >
      <div className="home-kap">
     about
      </div>
      <div>
      Js úlohy je webová aplikace obsahující své vlastní programovací prostředí, ve kterém může uživatel plnit různá zadání a zlepšovat se v jazyce JavaScript.
      </div>
      <div className="home-kap">
     používání
      </div>
          <div>
            V prostředí se nachází textový box do kterého se vytváří řešení úlohy, po jeho pravici se nachází výstupní konzole a pod ní dvě tlačítka, run a odevzdat. Tlačítko run spustí kód a do konzole vypíše jeho výsledek, odevzdání spustí testy a do konzole vrátí hlášení jestli je kód napsán správně popřípadě na jakém testu selhal.
          </div>
      </Grid>


    </Grid>
        
      
          {/* <div className="home-block">
           
            kapitola 2.2
            <div className="home-button">
                <Button pill theme="secondary">pokračovat</Button>
            </div>
            
       </div>


        <Row>
        <Col sm="12" lg="6">
        <div className="home-kap">
        přehled kapitol 
        </div>
          </Col>

          <Col sm="12" lg="6">
          <div className="home-text">
          postup kurzem
          </div>
          </Col>
          <Col>
         
          </Col>
        </Row>


    <Row>
        <Col sm="12" lg="6">
        <div >
        
        {exercises.map(exercises=>(
            <div className="home-kapitoly">
            <li key={exercises.name}>
            <Link to={"console/" + exercises.name}>{exercises.name}</Link>
                
            </li>  
            </div>
          ))}
            </div>

            </Col>

        <Col sm="12" lg="6">
        
            <LoadBar value="60" className='loadBar' bgcolor="#5a6169"></LoadBar> 
         
        </Col>
    </Row> */}
           
  </Container>
  </div>
  );
}

export default Home;