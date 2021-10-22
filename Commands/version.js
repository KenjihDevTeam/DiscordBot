//Module für den Versions-Command
module.exports = {

    name: 'version',
    description: 'Der Command gibt die aktuelle Version vom laufenden Bot wieder',
    execute(Discord, client, config, message, args) {

        const version = config.config.version;
        const versionEmbed = `Der Server-Bot läuft gerade auf der Version ${version}`

        message.lineReply(versionEmbed);
    }

}