const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const path = require("path");
const port = process.env.PORT;
const app = express();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

const chat = require("./chat");
const images = require("./image");

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

app.get('/profile', (req, res) => {
    res.render("profile/index")
});

app.get('/scanner', (req, res) => {
    res.render("scanner/index")
});

app.get('/nimiq', (req, res) => {
    res.render("nimi/index")
});

app.get('/menu', (req, res) => {
    res.render("menu/index")
});

app.get('/chat/:bot_id', (req, res) => {
    console.log(req.query);

    chat.chatbot_verify(
        bot_id=req.params["bot_id"], 
        mode=req.query["hub.mode"], 
        verify_token=req.query["hub.verify_token"],
        challenge=(req.query["hub.challenge"] == null) ? null : req.query["hub.challenge"] 
        ).then(
            (_res) => {
                res.status(200).send(_res.data[0]);               
                res.end();
            }
        );
});

app.post('/chat/:bot_id', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    chat.chatbot_messages(bot_id=req.params["bot_id"], data=req.body);    
    res.status(200).send("OK");               
    res.end();
});

app.get("/image", (req, res) => {
    console.log(req.query);
    proxy.web(req, res, {target: process.env.IMG_SERVER});

});

app.get('/docs', (req, res) => {
    console.log(req.query);
    proxy.web(req, res, {target: "http://127.0.0.1:5002/"})
});

app.get('/openapi.json', (req, res) => {
    console.log(req.query);
    proxy.web(req, res, {target: "http://127.0.0.1:5002/"})
});

app.listen(port, () => {    
    console.log(`This app is running on port:${port}`);
});