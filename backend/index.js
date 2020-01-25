const express = require('express'),
      app     = express(),
      bodyParser = require('body-parser')

app.use(bodyParser.json())

require('./routes/dialogFlowRoutes')(app)
require('./routes/sign')(app)


const PORT = process.env.NODE_ENV || 8000

app.listen(PORT, ()=>{
    console.log("Server Running on Port: " + PORT)
})