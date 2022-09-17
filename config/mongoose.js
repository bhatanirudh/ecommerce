//reuire the library
const mongoose = require('mongoose');
// const env=require('./environment');
//connect to the database 
mongoose.connect(`${process.env.db}`);

//accquire the connection (to check if its sucessfull or not)
const db= mongoose.connection;

//on and once are handlers  

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//  up and running print it
db.once('open',function(){
    console.log("Sucesfully connected to the Mongo DB")
});

