const axios = require('axios');
const http = require('http');


exports.chatbot_verify = async function(bot_id, mode, verify_token, challenge=null){   
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.APP_SERVER + '/chat/' + bot_id + '?hub.mode=' + mode  + '&hub.verify_token=' + verify_token,
        headers: { }
    };

    if (challenge!= null){ config.url = config.url  + '&&hub.challenge=' + challenge }

    return axios.request(config)    
    .then(response => response)
    .catch(error => console.log(error));     
};


exports.chatbot_messages = async function(bot_id, data){
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.APP_SERVER + '/chat/' + bot_id,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios.request(config)    
    .then(response => response)
    .catch(error => console.log(error));
}


exports.chatbot_documentation = async function(){ 
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.APP_SERVER + '/redoc',
        headers: { }
    };

    return axios.request(config)    
    .then(response => response)
    .catch(error => console.log(error));     
};



exports.getDocs = async function(_req, _res){
    console.log("finding api documentation");

    var options = {
        hostname: "jeremi.web-ones.com",
        port:3000,
        path: process.env.APP_SERVER + "/redoc",
        method: "get",
        header:{}
    };

    var proxy = http.request(options, function(res){
        _res.writeHead(res.statusCode, res.headers);
        res.pipe(_res, {
            end: true
        });
    });
    _req.pipe(proxy, {
        end: true
    });
};


