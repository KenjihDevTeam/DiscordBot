//Module für den Leaver-Channel
module.exports = {

    name: 'leaver',
    discription: 'Dieses Event schickt automatisch eine Infonachricht, wenn ein Nutzer den Server verlassen hat',
    execute(Discord, client, config, member) {

        //Setzt URL
        let URL;
        if(member.user.avatarURL() === null) {
            URL = member.user.defaultAvatarURL;
        } else {
            URL = member.user.avatarURL();
        }

        //Setzt Embed
        const leaverEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, URL, null)
            .setDescription(`**<@${member.id}> hat den Server verlassen**`)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp()
            .setColor('#e74a3b')

        const logID = config.events.member_log.channelid;
        const log = client.channels.cache.get(logID);
        log.send(leaverEmbed);

    }
}