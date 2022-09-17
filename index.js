require('dotenv').config();
const express=require('express');
const port = process.env.PORT || 8000;



const ejs=require('ejs');
const bodyParser=require('body-parser');
const session=require('express-session');

// const MongoStore = require('connect-mongo');
const db = require('./config/mongoose');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('assets'));
app.use(session({secret:"ironman"}));

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.use('/',require('./routes/index'));

app.listen(port,()=>{
    console.log(`Server up and running on port : ${port}`);
});