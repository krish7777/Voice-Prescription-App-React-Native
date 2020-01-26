const voicePrescription = require("../src/voicePrescription");

const createPDF = require("../src/pdfGenerator");

let admin = require("firebase-admin");

const firebase = require("../firebase/firebase.utils");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ HELLO: "FROM JARVIS" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await voicePrescription.textQuery(
      req.body.text,
      req.body.parameters
    );
    res.json(responses[0].queryResult);
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responses = await voicePrescription.eventQuery(
      req.body.event,
      req.body.parameters
    );
    res.json(responses[0].queryResult);
  });

  app.post('/api/prescriptions', (req, res) => {
    let prescriptions = []
    firebase.firestore.collection('prescriptions').get()
    .then(snapShot => {
      snapShot.forEach(doc => {
        if(doc.data().email === req.body.userEmail) prescriptions.push(doc.data())
      })
      res.json(prescriptions)
    })
    .catch(err => res.json(err))
  })

  app.post("/api/finalData", async (req, res) => {
    const now = new Date();

    let currentdate =
      "" + now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    const data = req.body.data;

    console.log(data)

    const presRef = firebase.firestore.collection("prescriptions");
    const presId = await presRef.add(data).then(response => response.id);

    await createPDF.createPDF(data);


    const userRef = firebase.firestore.collection("users");
    let queryRef = userRef
      .where("email", "==", data.email)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userData = doc.data();

          userData = {
            ...userData,
            prescriptions: userData.prescriptions
              ? [...userData.prescriptions, presId]
              : [presId]
          };

          const user = firebase.firestore.doc(`users/${doc.id}`);

          user.set(userData);
        });
      });

    res.send("Successfull");
  });
};
