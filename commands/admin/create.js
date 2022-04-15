const { Collection } = require("discord.js")

exports.execute = async(bot, message, args) => {
    const server = bot.guilds.cache.get(message.guildId)
    const schema = require("../../config/schema.json")    
    let roles = new Collection()

    schema.roles.forEach(async (role, id) =>
    {
        const newRole = await server.roles.create({name: role.name, color: role.color, reason: "Création du Discord"})
        roles.set(id, newRole)
    })

    for(const [category, object] of Object.entries(schema.channels))
    {
        let newCat = await server.channels.create(category,
        {
            type: "GUILD_CATEGORY"
        })

        for(const [name, config] of Object.entries(object))
        {
            let permissions = []
            let deny = []
            
            if(config.writable == false)
                deny.push("SEND_MESSAGES")

            if(config.private)
            {
                config.private.forEach(role =>
                {
                    permissions.push({
                        id: roles.get(role).id,
                        allow: "VIEW_CHANNEL"
                    })
                })
                deny.push("VIEW_CHANNEL")
            }

            permissions.push({
                id: server.id,
                deny: deny
            })            

            await server.channels.create(name,
            {
                type: config.type == 0 ? "GUILD_TEXT" : "GUILD_VOICE",
                parent: newCat.id,
                permissionOverwrites: permissions
            })
        }
    }
}

exports.help = {
    name: "create"
}