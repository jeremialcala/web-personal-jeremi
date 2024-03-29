const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const path = require("path");
const port = process.env.PORT;
const app = express();

const chat = require("./chat");

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

app.get('/chat/:bot_id', (req, res) => {
    console.log(req.query);

    chat.chatbot_verify(
        bot_id=req.params["bot_id"], 
        mode=req.query["hub.mode"], 
        verify_token=req.query["hub.verify_token"],
        challenge=(req.query["hub.challenge"] == null) ? null : req.query["hub.challenge"] 
        ).then(
            (_res) => {
                res.writeHead(_res.data[0], {
                    "Content-Type": "Application/Json",
                    "Content-Length": _res.headers["content-length"],
                    "X-Processing-Time": _res.headers["x-processing-time"]
                });
                res.write(JSON.stringify(_res.data));
                res.end();
            }
        );
});

app.listen(port, () => {    
    console.log(`This app is running on port:${port}`);
});