const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const path = require("path");
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render("index")
});


app.listen(port, () => {    
    console.log(`This app is running on port:${port}`);
});