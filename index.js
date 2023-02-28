const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const connectDB = require('./database/connection');

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

connectDB();

app.use(session({
    secret:"Pawan",
    resave:false,
    saveUninitialized:false
}));

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));

app.use('/',require('./routes/router'));

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
})