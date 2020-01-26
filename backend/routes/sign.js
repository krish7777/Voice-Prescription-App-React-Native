const firebase = require("../firebase/firebase.utils");

module.exports = app => {
  currentUser = null;

  async function getUser(user) {
    console.log(user.uid);
    if (user) {
      const userRef = firebase.firestore.doc(`users/${user.uid}`);
      const snapShot = await userRef.get();

      if (!snapShot.exists) {
        return snapShot.data();
      }
    } else {
      return null;
    }
  }

  app.post("/signin", async (req, res) => {
    try {
      console.log("come on baby");
      firebase.auth
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(response => {
          const userRef = firebase.firestore.doc(`users/${response.user.uid}`);
          userRef
            .get()
            .then(doc => {
              res.json(doc.data());
            })
            .catch(err => res.json({ error: err }));
        });
    } catch (err) {
      res.json({ error: err });
    }
  });

  app.post("/signup", async (req, res) => {
    if (!!req.body.doctorId) {
      try {
        const { user } = await firebase.auth.createUserWithEmailAndPassword(
          req.body.email,
          req.body.password
        );
        await firebase.createProfileDoctor(user, {
          displayName: req.body.displayName,
          doctorId: req.body.doctorId,
          hospital: req.body.hospital
        });
        firebase.auth
          .signInWithEmailAndPassword(req.body.email, req.body.password)
          .then(response => {
            const userRef = firebase.firestore.doc(
              `users/${response.user.uid}`
            );
            userRef
              .get()
              .then(doc => {
                res.json(doc.data());
              })
              .catch(err => res.json({ error: err }));
          });
      } catch (err) {
        console.log(err);
        res.json({ error: err });
      }
    } else {
      try {
        const { user } = await firebase.auth.createUserWithEmailAndPassword(
          req.body.email,
          req.body.password
        );
        firebase
          .createProfileUser(user, { displayName: req.body.displayName })
          .then(response => {
            const userRef = firebase.firestore.doc(
              `users/${response.user.uid}`
            );
            userRef
              .get()
              .then(doc => {
                res.json(doc.data());
              })
              .catch(err => res.json({ error: err }));
          });
      } catch (err) {
        res.json({ error: err });
      }
    }
  });
};
