import React, {useState, useLayoutEffect } from 'react';
import firebase from "firebase"

const db = firebase.firestore()


export const getExercises = async () => {
    const data = await db.collection("exercises").get();
    
    return(data.docs.map(doc=>doc.data()))
    
}

  

