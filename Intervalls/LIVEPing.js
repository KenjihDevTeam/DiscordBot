module.exports = (Discord, client) => {

    //Importiert tmi.js
    const config = require('../config.json');
    const auth_name = config.auth.tmi_name;
    const auth_pass = config.auth.tmi_auth;

    const tmi = require('tmi.js');
    const tmi_client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: auth_name,
            password: auth_pass
        },
        channels: [ 'Kenjih_' ]
    }); 


    //Intervall
    setInterval(() => {

        

    }, 60000)

}