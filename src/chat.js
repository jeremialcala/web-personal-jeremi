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
