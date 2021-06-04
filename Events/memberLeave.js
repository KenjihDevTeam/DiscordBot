module.exports = (Discord, client) => {
    
    client.on('guildMemberRemove', member => {

        //Holt Werte aus der Config
        const config = require('../config.json');
        const leaverID = config.goodbye.goodbye_channel;

        const leaver_channel = client.channels.cache.get(leaverID);

        //Definiert und sendet die Nachricht
        const Nachricht = `<@${member.id.toString()}> hat der Server verlassen 💔`;
        leaver_channel.send(Nachricht);

    });

}