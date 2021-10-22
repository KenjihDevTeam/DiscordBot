module.exports = {

    name: 'delete',
    description: 'Dieses Event loggt, wenn ein Moderator eine Nachricht löscht', 
    execute(Discord, client, config, color, message) {

        //Überprüft ob der Channel gewechselt wurde
        const user = message.author;
        const userID = user.id;
        const logID = config.events.mod_log.channelid;
        const log = client.channels.cache.get(logID);

        //Setzt URL
        let URL;
        if(user.avatarURL() === null) {
            URL = user.defaultAvatarURL;
        } else {
        URL = user.avatarURL();
        }

        //Sendet das Embed 
        const deleteEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.tag}`, URL, null)
            .setDescription(`**Die folgende Nachricht wurde aus <#${message.channel.id}> gelöscht \n *» ${message.content.toString()}* **`)
            .setFooter(`ID: ${userID}`)
            .setTimestamp()
            .setColor('#36b9cc')

        log.send(deleteEmbed);

    }

}