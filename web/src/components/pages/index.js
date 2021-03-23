import React, {useState, useEffect} from "react";
import LoadBar from '../loadbar';
import { Link } from "react-router-dom";
import { Container, Grid, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getExercises, getAllExe} from '../../dtb_requests/db'


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
    backgroundColor:"rgb(250, 250, 250)",
    padding:"calc(0.5vw + 0.5vh)",
    paddingLeft:"calc(1vw + 1vh)",
    paddingRight:"calc(1vw + 1vh)",
    borderRadius:"5%"
  },
  homeContent:{
    padding: "calc(0.5vw + 0.5vh)",
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
  
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);

  useEffect(()=>{
      const fetchUsers = async () => {
       setExercises(await getExercises())
      }
      fetchUsers();
  }, [])
  
  return (    
 
          <div className={classes.root}>
      <Container maxWidth="lg">
        
      <Grid container>
      <Grid item xs={12} className={classes.homeBlock}>
          <div className={classes.blockText}>
            cvičení
          </div>

          <div className={classes.headerText}>
            current exercise
          </div>
          <div>
          <Button color="inherit" size="large" className={classes.continueBtn} >pokračovat</Button>
          </div>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.homeContent} >
      <div className="home-kap">
     J
      </div>
      s úlohy je webová aplikace obsahující své vlastní programovací prostředí, ve kterém může uživatel plnit různá zadání a zlepšovat se v jazyce JavaScript.
        <div>
          
          {/* {exercises.map(exercises=>(
            <div className="home-kapitoly">
              <li key={exercises.name} className={classes.link}>
                <Link to={"console/" + exercises.name}  className={classes.aHref}> {exercises.name} </Link>
                
              </li>  
            </div>
          ))} */}
        </div>
      <div>
        
      </div>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.homeContent}>
      
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