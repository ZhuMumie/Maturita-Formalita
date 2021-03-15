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


exports.getOrder = functions.https.onRequest((req, res)=>{
  var order = [];
  admin.firestore().collection('exercises').get().then(snapshot =>{
    snapshot.forEach(doc =>{
      
        order.push(doc.data().exeOrder)
    })
    return res.send(order)
  })  

})






// exports.getOrder = functions.https.onRequest((request, response) => {
//   var num = 0;
//   admin.firestore().collection('exercises').get().then((querySnapshot)=>{
//     const tempDoc = querySnapshot.docs.map((doc) => {
//         return { id: doc.id, ...doc.data() }
//       })
    
//     tempDoc.map((exercise)=>{
//        if(num<exercise.exeOrder)
//        {
//            num=exercise.exeOrder
//        }
//        else num++
//     })
// })

//   response.sendStatus(num);
// });