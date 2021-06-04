module.exports = async (Discord, client) => {

    //Holt Werte aus der Config
    const config = require('../config.json');
    const guild = client.guilds.cache.get(config.membercount.guild);
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get(config.membercount.channelID);
    const prefix = config.membercount.prefix;


    //Intervall für die Logik
    setInterval(() => {

        channel.setName(prefix + `${memberCount.toString()}`);

    }, 60000);
    
}