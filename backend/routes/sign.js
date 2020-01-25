const firebase = require('../firebase/firebase.utils')

module.exports = app => {
    app.post('/signin', async (req, res) => {
        try{
            const response = await firebase.auth.signInWithEmailAndPassword(req.body.email, req.body.password);
            console.log(response)
            res.json(response)
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
                const response = await firebase.createProfileDoctor(user, { displayName: req.body.displayName, doctorId: req.body.doctorId });
                console.log(response)
                res.json(response)
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
                const response = await firebase.createProfileUser(user, { displayName: req.body.displayName }) 
                
                res.json(response)
            }
            catch(err){
                res.json({error: err})
            }
        }
    })
}