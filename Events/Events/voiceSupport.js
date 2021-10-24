module.exports = {

    name: 'VoiceSupport',
    description: 'Dieses Event pingt die Moderatoren, wenn ein Nutzer den Voicesupport betritt',
    execute(Discord, client, config, oldState, newState){

                    
        //Überprüft ob der Channel gewechselt wurde
        const oldChannelID = oldState.channelID;
        const newChannelID = newState.channelID;
        const user = newState.member;
        const userID = user.id;
        const logID = config.events.voicelog.channelid;
        const log = client.channels.cache.get(logID)
        

        if(oldChannelID === newChannelID) return;

        if(newChannelID === config.events.voicesupport.voice_channel) {
                    
            //Definiert den Ping
            const channelID = config.voicesupport.ping_channel;
            const channel = client.channels.cache.get(channelID);
            const pingMessage = `**Ping:** <@&${config.voicesupport.roleid}>` 

            //Setzt URL
            let URL;
            if(user.user.avatarURL() === null) {
                URL = user.user.defaultAvatarURL;
            } else {
            URL = user.user.avatarURL();
            }

            //Definiert die Infonachricht
            const infoEmbed = new Discord.MessageEmbed()
                .setAuthor(`${user.user.tag}`, URL, null)
                .setDescription(`**<@${userID}> hat den <#${config.voicesupport.voice_channel}> betreten.**`)
                .setFooter(`ID: ${userID}`)
                .setTimestamp()
                .setColor('#4e73df')

            //Sendet die Nachrichten
            channel.send(pingMessage, infoEmbed);
        }

    }

}