//Module für den MemberCount-Command
module.exports = {

    name: 'membercount',
    description: 'Der Command gibt die aktuelle Anzahl von Nutzern auf dem Discord zurücl',
    execute(Discord, client, config, message, args) {

        const id = config.commands.id;
        const guild = client.guilds.cache.get(id);

        const membercount = guild.memberCount.toLocaleString();
        message.lineReply(`Es sind ${membercount} Leute auf dem Discord 💙`);

    }

}