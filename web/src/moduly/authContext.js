import React, {useState,  useContext, useEffect, useLayoutEffect} from 'react';
import fire from '../components/fire';
import firebase from 'firebase';
import {useHistory } from "react-router-dom";


export const AuthLocalContext = React.createContext(

)



const AuthLocalProvider=({children})=>{
    const db = firebase.firestore()
    let history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    function singup(email, password){

        return fire.auth().createUserWithEmailAndPassword(email, password);

    }
     
    const login=(email, password)=>{
      return  fire.auth().signInWithEmailAndPassword(email, password);
    }

    function logout(){
        fire.auth().signOut();
        history.push("/");
    }

    
    useLayoutEffect(() => {
        const unsubscribe = fire.auth().onAuthStateChanged(user => {
          if(user) setCurrentUser(user);

          var isOnline = firebase.auth().currentUser;

          if(isOnline){ 
          const getAdmin = async () =>{
            const data = await firebase.firestore().collection("users").doc(user.uid);
              data.get().then(function(doc){
                if (doc.exists) {
                  setIsAdmin(doc.data().isAdmin)
              } else {
                  console.log("No such document!");
              }
              })
          }
          getAdmin()
        }
         
          setLoading(false);
        })
        
        
        return unsubscribe
      }, [])


      

    function microSingUp(){
            var provider = new firebase.auth.OAuthProvider('microsoft.com');
        
            provider.setCustomParameters({
              // Force re-consent.
              prompt: 'select_account',
              tenant: '81d89366-7747-4fe5-a737-97f57d0c18ec'
          
            });
        
          fire.auth().signInWithPopup(provider).then(function (result){
            
          })
    }
          
          const value = {
            currentUser,
            singup,
            login,
            logout,
            microSingUp,
            isAdmin
          }

    return(
        <AuthLocalContext.Provider value={value}>
              {!loading && children}
        </AuthLocalContext.Provider>

    )
    
}

export const AuthContext={
    Provider:AuthLocalProvider,
    Consumer:AuthLocalContext,
}

 