//Module für den Leaver-Channel
module.exports = {

    name: 'joiner',
    discription: 'Dieses Event schickt automatisch eine Infonachricht, wenn ein Nutzer den Server betreten hat',
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
            .setDescription(`**<@${member.id}> hat den Server betreten**`)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp()
            .setColor('#1cc88a')

        const logID = config.events.member_log.channelid;
        const log = client.channels.cache.get(logID);
        log.send(leaverEmbed);

        console.log(`Events » Joiner » Der Nutzer ${member.tag} hat den Server betreten`.brightBlue);

    }
}