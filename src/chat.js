const axios = require('axios');
const http = require('http');


exports.chatbot_verify = async function(mode, verify_token){
   
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.APP_SERVER + '/chat/' + bot_id + '?hub.mode=' + mode  + '&hub.verify_token=' + verify_token,
        headers: { }
    };

    return axios.request(config)    
    .then(response => response)
    .catch(error => console.log(error));     
}
