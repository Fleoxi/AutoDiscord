const Discord       = require("discord.js")
const fs            = require("fs")

require("dotenv").config()

/* INSTANCE BOT */
const bot = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

bot.commands = new Discord.Collection()

/* COMMAND HANDLER */
const cmds_modules = ['admin']
cmds_modules.forEach(c => {
    fs.readdir(`${__dirname}/commands/${c}/`, (err, files) => {
        if(err) throw err
        files.forEach(f => {
            const command = require(`${__dirname}/commands/${c}/${f}`)
            bot.commands.set(command.help.name, command)
        })
    })
})

/* EVENT HANDLER */
const events_modules = ['general']
events_modules.forEach(c => {
    fs.readdir(`${__dirname}/events/${c}/`, (err, files) => {
        if(err) throw err
        files.forEach(f => {
            const event = require(`${__dirname}/events/${c}/${f}`)
            let name = f.slice(0, -3)
            
            bot.on(name, event.bind(null, bot))
        })
    })
})

/* RUN INSTANCE */
bot.login(process.env.BOT_TOKEN)