import React, {useState, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import firebase from 'firebase';
import Navibar from './navbar';
import {AuthLocalContext} from '../moduly/authContext';
// function ProtectedRouter(props){
//     const {Component,
//       } = props

      
//       return (<Navibar>aaaaaa</Navibar> )

// }


const  ProtectedRouter=({ component: Component, ...rest })=> {
  
// const [currentUseLocal, SetCurrentUserLocal]= useState();

// useEffect(() => {
//   const {currentUser
//   } = React.useContext(AuthLocalContext)
//   SetCurrentUserLocal(currentUser)

// },[])

const {currentUser
} = React.useContext(AuthLocalContext)




  return (
  <Route {...rest} render={(props) => (
    currentUser
      ? <div>
        <Navibar></Navibar>
        <Component {...props} />
        </div>
      : 
      <Redirect to="/signup" />
  )} />
)}


export default ProtectedRouter;