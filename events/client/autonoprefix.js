module.exports = async (client) => {
    client.on('guildMemberUpdate', async (o, n) => {
        if(o.guild.id !== '1221909487472869619') return;
        let support = await client.guilds.cache.get('1221909487472869619')
        let role = support.roles.premiumSubscriberRole
        if (role) {
            let before = o.roles.cache.has(role.id)
            let after = n.roles.cache.has(role.id)
            if (!before && after) {
       await client.db.push(`noprefix_${client.user.id}`,n.id)      
       await client.channels.cache.get('1296487522184200286').send(`Auto Noprefix Added To ${n} With Reason : \`Boosted The Server\``)
            }
            if (before && !after) {
                await client.db.pull(`noprefix_${client.user.id}`,o.id)       
                await client.channels.cache.get('1296487522184200286').send(`Auto Noprefix Removed To ${o} With Reason : \`Removed The Boost\``)

                     }
        }      
    
    })
}
