//Config des Discord Bots
const Discord = require('discord.js');
require('discord-reply')
const client = new Discord.Client();

//Installiert externe Packages
const color = require('colors');

//Zieht Config-Daten 
const config = require('./config.json');
require('dotenv').config();
const auth = process.env.TOKEN;

//Lädt Dateien
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands');

for(const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}
const prefix = config.config.botprefix;

//Event sobald der Client eingeloggt ist
client.on('ready', () => {

    //Loggt den erfolgreichen Login und setzt den Status
    console.log('Discord » Der Discord-Bot hat sich erfolgreich verbunden!'.brightBlue);
    client.user.setActivity(config.config.channellink, {type: "WATCHING"});

    //Lädt den Eventhandler
    require('./Events/EventHandler').execute(Discord, client, config, color);
    require('./API/memberCount').execute(Discord, client, config);

});

//Event sobald der Client eine Nachricht erhält
client.on('message', message => {

        //Startet den Commandhandler
        const command_id = config.commands.channel_id;
        if(message.channel.id === command_id) {
            if (!message.content.startsWith(prefix) || message.author.bot) return;


            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            if (!client.commands.has(command)) {
                message.lineReply('❌ Dieser Command existiert nicht! Überprüfe deine Rechtschreibung ❌');
            } else try {
                client.commands.get(command).execute(Discord, client, config, message, args);
            } catch {
                console.log(error.red);
                message.lineReply('❌ Es gab einen Fehler den Command auszuführen ❌');
            }
            ;
        }
});

//Loggt den Client ein
client.login(auth);