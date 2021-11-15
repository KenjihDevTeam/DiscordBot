//Module für den Moderationslog
module.exports = {

    name: 'delete',
    description: 'Bei einem Event loggt der Bot, wenn eine Nachricht gelöscht wird',

    execute(Discord, client, config, message) {

        const author = message.author;
        const userID = author.id;
        const log = client.channels.cache.get(config.events.mod_log.channelid);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`)
            .setDescription(`**Eine Nachricht von <@${userID}> wurde von einem Moderator aus <#${message.channel.id}> gelöscht** \n *${message.content}*`)
            .setFooter(`ID: ${userID}`)
            .setTimestamp()
            .setColor('#e74a3b')
        log.send(embed);
        console.log(`Events » Delete » Eine Nachricht des Nutzers ${author.tag} wurde aus ${message.channel.name} gelöscht.`.brightBlue);

    }

}