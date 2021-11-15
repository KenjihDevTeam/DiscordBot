module.exports = {

    name: 'MemberCount',
    description: 'Dieses Event ändert den Channelnamen vom MemberCount', 
    execute(Discord, client, config, member) {

        //Funktion für das Umbenennen
        const getMemberCount = (guild) => {
    
            const channelID = config.events.membercount.channelID;
            const channel = client.channels.cache.get(channelID);
            const memberCount = `${config.events.membercount.prefix} ${guild.memberCount.toLocaleString()}`;
            channel.setName(memberCount);

            console.log(`Events » Membercount » Der Membercount wurde auf ${guild.memberCount.toLocaleString()} aktualisiert`.brightBlue);

        }

        getMemberCount(member.guild)

    }

}