//Config des Discord Bots
const Discord = require('discord.js');
const client = new Discord.Client();

//Setzt Variablen für die externen Dateien
const memberJoin = require('./Events/memberJoin');
const memberLeave = require('./Events/memberLeave');
const memberCount = require('./Intervalls/memberCount');

//Zieht Config-Daten 
const config = require('./config.json');
const auth = config.auth.discord;

//Event sobald der Client eingeloggt ist
client.on('ready', () =>{

    //Loggt den erfolgreichen Login und setzt den Status
    console.log('Discord » Der Discord-Bot hat sich erfolgreich verbunden!');
    client.user.setActivity(config.config.ChannelLink, {type: "WATCHING"});

    //Aufrufen der externen Dateien
    memberLeave(Discord, client);
    memberJoin(Discord, client);
    memberCount(Discord, client);

})

//Loggt den Client ein
client.login(auth);