module.exports = {

    name: 'EventHandler',
    description: 'Dieses Script handelt eingehende Events',
    execute(Discord, client, config, color) {

        client.on('voiceStateUpdate', (newState, oldState) => require('./Events/voiceLog').execute(Discord, client, config, color, newState, oldState));
        client.on('voiceStateUpdate', (newState, oldState) => require('./Events/voiceSupport').execute(Discord, client, config, color, newState, oldState));
        client.on('guildMemberAdd', (member) => require('./Events/memberCount').execute(Discord, client, config, color, member));
        client.on('guildMemberAdd', (member) => require('./Events/joiner').execute(Discord, client, config, color, member));
        client.on('guildMemberRemove', (member) => require('./Events/memberCount').execute(Discord, client, config, color, member));
        client.on('guildMemberRemove', (member) => require('./Events/leaver').execute(Discord, client, config, color, member));
        client.on('messageDelete', (message) => require('./Events/delete').execute(Discord, client, config, color, message));
    
    }

}