module.exports = (Discord, client) => {

    client.on('guildMemberAdd', member => {

        //Holt Werte aus der Config
        const config = require('../config.json');
        const welcomeID = config.welcome.welcome_channel;
        const rulesID = config.welcome.rules_channel;
        const newsID = config.welcome.news_channel;
        
        const welcome_channel = client.channels.cache.get(welcomeID);
        const rules_channel = client.channels.cache.get(rulesID);
        const news_channel = client.channels.cache.get(newsID);

        //Definiert und sendet die Nachricht
        const Nachricht = `Hey <@${member.id.toString()}> willkommen auf dem Community Discord von Kenjih 👋\n  Bitte lese dir bevor du den Server benutzt das ${rules_channel.toString()} 📜\n Für Updates auf dem Server behalte ${news_channel.toString()} 🔥\n  Wir wünschen dir viel Spaß 🤠`
        welcome_channel.send(Nachricht);

    })

}