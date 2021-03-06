import React, {useState, useLayoutEffect } from 'react';
import fire from "firebase"
import firebase from "firebase"
import { number } from 'shards-react';
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


export const getUserID = async () =>{
   await fire.auth().onAuthStateChanged(user =>{
        if(user) return user.uid
        else return null
      })
}

export const markDone = async (exeid, userid) =>{
    await db.collection("progression").add({
       exercise_id:exeid,
       user_id:userid, 
    })
}

export const giveExeOrder = async () =>{
    var num = 0;
    await  db.collection("exercises").get().then((querySnapshot)=>{
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
        
        tempDoc.map((exercise)=>{
           if(num<exercise.exeOrder)
           {
               num=exercise.exeOrder
           }
           else num++
        })
    })
    
    return num
}