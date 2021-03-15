import { Container, Grid, Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import {AuthLocalContext} from '../../moduly/authContext';
import fire from 'firebase'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    bottom: 0,
  
    position: 'sticky',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: "theme.palette.text.secondary",
    backgroundColor:"rgb(247, 247, 247)",
    fontSize:"1.5em",
   
    paperOrder:{
      padding: theme.spacing(2),
      textAlign: 'left',
      color: "pink",
      backgroundColor:props => props.backgroundColor,
      fontSize:"1.5em",
    }

  },
  paperCompleted:{
    padding: theme.spacing(2),
    textAlign: 'left',
    color: "rgb(247, 247, 247)",
    backgroundColor:"rgb(240, 240, 240)", 
    fontSize:"1.5em",
   
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
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
    
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    position: 'absolute',
    zIndex: 1,
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  }, 
   buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }

}));


function Exercises(){
    const classes = useStyles();
    const [exercises, setExercises] = useState([])
    const [user, setUser] = useState();
    const [isDone, setIsDone] = useState([]);

    const {isAdmin, currentUser} = React.useContext(AuthLocalContext)
    
    
 
  var curUser = firebase.auth().currentUser;
 
    const fetchData = async () =>{
      const data = await firebase.firestore().collection("exercises").orderBy("exeOrder");
      const progress = await firebase.firestore().collection("progression");
   
      data.get().then((querySnapshot)=>{
          const tempDoc = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() }
            })
            
          
        setExercises(tempDoc)

     
        progress.where("user_id", "==", curUser.uid).get().then(function(querySnapshot){
         const progTemp = querySnapshot.docs.map((progDoc) =>{
          return progDoc.data().exercise_id 
         })

         setIsDone(progTemp)
        })
          
      })
     


    }
    useEffect(()=>{
        fetchData()
        
    }, [])

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const handleButtonClick = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          changeOrder();
          setLoading(false);
          
        }, 2000);
        timer.current = window.setTimeout(() => { 
         
          setShowSave(false)
        }, 3000);
      }
      
    };

    const deleteData = async (id) =>{
      await firebase.firestore().collection("exercises").doc(id).delete();
      fetchData() 
    }

   
    
    
const changeOrder = ()=>{
  var i = -1;
  firebase.firestore().collection("exercises").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        
        exercises.map((exercise, index)=>{
         
          if(doc.id==exercise.id){

            firebase.firestore().collection("exercises").doc(doc.id).update({
              exeOrder: index
            })

          }
          
        })
        i++;
      
     
    });
});

}
const [showSave, setShowSave] = useState(false);
const handleOnDragEnd = (result)=>{
  if(!result.destination) return;
  setShowSave(true)
  const items = Array.from(exercises)
  const [reorderItem] =items.splice(result.source.index, 1)
  items.splice(result.destination.index, 0, reorderItem)

  setExercises(items)


}

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


return isAdmin ?(
  <div>
   <Container className={classes.root}>
       <Grid container spacing={3}>

       <Grid item xs={12}>
          <div className={classes.header}>
          JS Cvičení 
          </div>
        </Grid>
     
        <Grid item xs={12}>
        <ul className={classes.listStyle} >
        <Link to="/addExercise" className="underline" > 
          <Paper elevation={2} className={classes.paper} style={{marginBottom:"10px", color:"green"}}>
            Vytvořit  
           <AddIcon fontSize="large" className={classes.icon}></AddIcon>
          </Paper>
          </Link>

        </ul>
        
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='exercises'>
            {(provided)=>(

        <ul className={classes.listStyle} {...provided.droppableProps} ref={provided.innerRef}>
        {exercises.map((exercise, index)=>(

             <Draggable key={exercise.name} draggableId={exercise.name} index={index}>
               {(provided) =>(
            <div className={classes.homeKapitoly}>
              <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <Paper elevation={2} className={classes.paper}>
                <Link className="underline"  underline="none" to={"console/" + exercise.name}>
                  {exercise.name}
                  </Link>
                  <button className={classes.btn} onClick={() => deleteData(exercise.id)}><DeleteIcon fontSize="large" className={classes.icon} ></DeleteIcon></button>
                  <Link className="underline"  underline="none" to={"editExercise/" + exercise.name}><EditIcon fontSize="large" className={classes.icon}></EditIcon></Link>
              </Paper>
              </li>  
              </div>
              )}

              </Draggable>
          ))} 
          {provided.placeholder}
          </ul>
          )}
          </Droppable>
          </DragDropContext>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </Grid>
       
      </Grid>

     
       
   </Container>
      {showSave ? (<>
        <div className={classes.wrapper}>
        
        <Fab
          aria-label="save"
          color="primary"
          className={classes.absolute}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={58} className={classes.fabProgress} />}
        
        </div>
      </>) : (<></>)}
   

   </div>
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

                   {isDone.map(exe =>(
                     <>
                     {exercises.id == exe ? (<>
                      <CheckCircleIcon  fontSize="large" className={classes.icon}></CheckCircleIcon>
                     </>) :
                      (<>

                      </>)}
                     </>
                   ))}
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