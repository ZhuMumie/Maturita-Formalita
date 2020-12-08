import React, {useState,  useContext, useEffect} from 'react';
import fire from '../components/fire';
import firebase from 'firebase';



export const AuthLocalContext = React.createContext(

)



const AuthLocalProvider=({children})=>{

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function singup(email, password){

        return fire.auth().createUserWithEmailAndPassword(email, password);
      
    }
     
    const login=(email, password)=>{
      return  fire.auth().signInWithEmailAndPassword(email, password);
    }

    function logout(){
        fire.auth().signOut();
    }

    
    useEffect(() => {
        const unsubscribe = fire.auth().onAuthStateChanged(user => {
          if(user) setCurrentUser(user);
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
        
            fire.auth().signInWithPopup(provider)
            .catch(function(error) {
              // Handle error.
            });
          }
          
          const value = {
            currentUser,
            singup,
            login,
            logout,
            microSingUp
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

 