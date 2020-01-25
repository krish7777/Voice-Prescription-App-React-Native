const  firebase  = require("firebase");

const { Storage } = require('@google-cloud/storage')
 
const config = {
  apiKey: "AIzaSyB3domjpsLstcwOrkPrEnz4OzxGoj-tkGU",
  authDomain: "sih-hack404.firebaseapp.com",
  databaseURL: "https://sih-hack404.firebaseio.com",
  projectId: "sih-hack404",
  storageBucket: "sih-hack404.appspot.com",
  messagingSenderId: "271382736855",
  appId: "1:271382736855:web:39d185c7cf5506b2fee592",
  measurementId: "G-N3J782D317"
};

firebase.initializeApp(config)

const auth = firebase.auth()

const firestore = firebase.firestore();

const googleClould = new Storage({
  keyFileName: require('../secret.json'),
  projectId: "sih-hack404"
})

const pdfFilesBucket = googleClould.bucket('sih-hack404.appspot.com')

const createProfileUser = async (User, additionalData) => {
  
  if(!User) return;
  const userRef = firestore.doc(`users/${User.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { email } = User;
    const createdAt = new Date();
    const displayName = additionalData.displayName
    try{
      await userRef.set({
        displayName,
        email,
        createdAt
      })
    }
    catch(err){
      console.log('Error while adding user: ' + err.message);
    }
  }
  return userRef;
}

const createProfileDoctor = async (User, additionalData) => {
    if(!User) return;
    const userRef = firestore.doc(`users/${User.uid}`);
    const snapShot = await userRef.get();
  
    if(!snapShot.exists){
      const { email } = User;
      const createdAt = new Date();
      const displayName = additionalData.displayName
      const doctorId = additionalData.doctorId
      const hospital = additionalData.hospital
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          doctorId,
          hospital
        })
  
      }
      catch(err){
        console.log('Error while adding user: ' + err.message);
      }
    }
    return userRef;
  }

module.exports = {
    firebase, auth, firestore, createProfileDoctor, createProfileUser, pdfFilesBucket
}