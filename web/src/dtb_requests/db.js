import React, {useState, useLayoutEffect } from 'react';
import firebase from "firebase"

const db = firebase.firestore()


export const getExercises = async () => {
    const data = await db.collection("exercises").get();
    
    return(data.docs.map(doc=>doc.data()))
    
}

export const getExercise = async () => {
    const data = await db.collection("exercises");
    data.get().then((querySnapshot)=>{
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })    
          console.log(tempDoc)
    })
}

export const getExistUser = async (id) =>{
    const data = await db.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', id.toString()).get();
    if(data.docs[0])
    { 
        return true;
    }
    else return false
   
}

export const getExerByName = async (name) =>{
    const data = await db.collection("exercises").where("name", "==", name).get();
    if(data.docs[0])
    { 
        return true;
    }
    else return false
}
  
export const getAllExe = async () =>{
    
    db.collection('exercises').snapshotChanges().map(actions => {
         actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
}

