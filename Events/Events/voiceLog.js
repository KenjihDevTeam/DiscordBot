const mongoose = require('mongoose');
const VoiceLog = require('../../API/MongoDB/schemas');

//Setzt das Module
module.exports = {

    name: 'VoiceLog',
    description: 'Dieses Event loggt automatisch, wenn ein Nutzer einen Channel betritt oder verlässt, bzw. seinen Channel wechselt',
    execute(Discord, client, config, oldState, newState) {

        //Überprüft ob der Channel gewechselt wurde
        const oldChannelID = oldState.channelID;
        const newChannelID = newState.channelID;
        const user = newState.member;
        const userID = user.id;
        const logID = config.events.voicelog.channelid;
        const log = client.channels.cache.get(logID);

        //Setzt URL
        let URL;
        if(user.user.avatarURL() === null) {
            URL = user.user.defaultAvatarURL;
        } else {
        URL = user.user.avatarURL();
        }

        //Überprüft auf das richtige Event
        if(oldChannelID === newChannelID) return
        else{

            if(newChannelID === null && newState.channel != null) {

                //Embed für den Log-Channel
                const leaveEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${user.user.tag}`, URL, null)
                    .setDescription(`<@${userID}> hat <#${oldChannelID}> verlassen`)
                    .setFooter(`ID: ${userID}`)
                    .setTimestamp()
                    .setColor('#e74a3b')
                log.send(leaveEmbed);


            } else if(oldChannelID === null && newState.channel != null) {

                //Embed für den Log-Channel
                const joinEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${user.user.tag}`, URL, null)
                    .setDescription(`<@${userID}> hat <#${newChannelID}> betreten`)
                    .setFooter(`ID: ${userID}`)
                    .setTimestamp()
                    .setColor('#1cc88a')

                log.send(joinEmbed);

            } else {

                //Embed für den Log-Channel
                const switchEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${user.user.tag}`, URL, null)
                    .setDescription(`<@${userID}> **ist von** <#${oldChannelID}> **in** <#${newChannelID}> **gegangen**`)
                    .setFooter(`ID: ${userID}`)
                    .setTimestamp()
                    .setColor('#36b9cc')

                log.send(switchEmbed);

            }

        }

    }

}