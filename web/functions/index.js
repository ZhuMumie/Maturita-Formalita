const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.updateProgression = functions.https.onCall((data, context)=>{
  if(!context.auth){
    throw new functions.https.HttpsError('failed-precondition',
    'user needs to be authenticated.');
  } 

  const exId = data.exeId;
  const  UId = context.auth.uid;

  return admin.firestore().collection('progression').add({
    exercise_id:exId,
    user_id: UId
  })
})


exports.updateCurrentExercise = functions.https.onCall((data, context)=>{
  if(!context.auth){
    throw new functions.https.HttpsError('failed-precondition',
    'user needs to be authenticated.');
  } 

  const exId = data.exeId;
  const  UId = context.auth.uid;

  return admin.firestore().collection('users').doc(UId).update({
    current_exercise_id:exId
  })
})


// exports.getOrder = functions.https.onRequest((req, res)=>{
//   var order = [];
//   admin.firestore().collection('exercises').get().then(snapshot =>{
//     snapshot.forEach(doc =>{
      
//         order.push(doc.data().exeOrder)
//     })
//     return res.send(order)
//   })  

// })


exports.getExercise = functions.https.onCall( async (data, context)=>{

  const name = data.exeName;
  if(!name)
  {
    return "ahoj"
  }
  const collection = admin.firestore().collection("exercises");
  const doc = collection.where('name', '==', name);
  const docData = await doc.get();
  if(!docData)
  {
   return new functions.https.HttpsError('invalid-argument', 'exercise doesnt exist');
  }
  console.log(docData);
  const {docs} = docData;
  const exercises = docs.map((doc)=>doc.data())

  return exercises[0];

})



