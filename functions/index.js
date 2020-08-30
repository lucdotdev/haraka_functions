const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.notifications_admin = functions.firestore.document('delivery/{deliveryId}').onCreate((change, context) => {
  // var registrationToken = getMessagingId("xuW7bOv4opey2GwRXLPfJgVp5782");
  // var message = {
  //   notification: {
  //     title: 'Nouvelle livraison',
  //     body: 'Yum '
  //   },
  //     token: registrationToken
  //   };
  // admin.messaging.apply.send(message)
  // .then((response) => {
  //   // Response is a message ID string.
  //   console.log('Successfully sent message:', response);
  //   return response;
  // })
  // .catch((error) => {

  // });
  return console.log('Error sending message:', error);
});


exports.notifications_client = functions.firestore.document('delivery/{deliveryId}').onWrite(async (change, context) => {

  const newValue = change.after.data();
  let tokensToRemove = [];



  if (newValue.status === 4)
   {
    var registrationToken1 = "";

    await admin.firestore().collection('users').doc(newValue.livreur_id).get().then((val)=>{
      registrationToken1 = val.data().message_id;
      return val.data().message_id;
    });

    console.log(registrationToken2);
    var message1 = {
      notification: {
        title: 'Nouvelle livraison',
        body: 'Vous devez livrer une nouvelle livraison'
      },

    };
    admin.messaging().sendToDevice(registrationToken1, message1)
      .then((response) => {
        console.log('Successfully sent message:', response);
        return response;
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  } 
  
  
  
  
  else if (newValue.status === 2)
  
  
  {

    var registrationToken2 = "";
    
    await admin.firestore().collection('users').doc(inewValue.store_id).get().then((val)=>{
      registrationToken2 = val.data().message_id;
      return val.data().message_id;
    });


    console.log(registrationToken2);
    var message2 = {
      notification: {
        title: 'Confirmation',
        body: 'La livraison a été confirmée'
      },
    };
    admin.messaging().sendToDevice(registrationToken2, message2)
      .then((response) => {
        console.log('Successfully sent message:', response);
        return response;
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

  return Promise.all(tokensToRemove);

})
