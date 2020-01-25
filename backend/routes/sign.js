const firebase = require('../firebase/firebase.utils')

module.exports = app => {

    currentUser = null

    firebase.auth.onAuthStateChanged(function(user){
        if(user){
            currentUser = user
        }
        else{
            currentUser = null           
        }
    })

    app.post('/signin', async (req, res) => {
        try{
            await firebase.auth.signInWithEmailAndPassword(req.body.email, req.body.password);
            res.json(currentUser)
        }
        catch(err){
            res.json({error: err})
        }
    })

    app.post('/signup', async (req, res) => {
        if(!!req.body.doctorId){
            try{
                const { user } = await firebase.auth.createUserWithEmailAndPassword(
                    req.body.email,
                    req.body.password
                );
                await firebase.createProfileDoctor(user, { displayName: req.body.displayName, doctorId: req.body.doctorId, hospital: req.body.hospital });
                res.json(currentUser)
            }
            catch(err){
                console.log(err)
                res.json({error: err})
            }
        }
        else{
            try{
                const { user }  = await firebase.auth.createUserWithEmailAndPassword(
                    req.body.email,
                    req.body.password
                );
                await firebase.createProfileUser(user, { displayName: req.body.displayName }) 
                
                res.json(currentUser)
            }
            catch(err){
                res.json({error: err})
            }
        }
    })
}