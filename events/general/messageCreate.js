module.exports = async(bot, message) => 
{
    const prefix = "!"

    if(message.author.bot) return
    if(message.content.indexOf(prefix) !== 0) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    try
    {
        bot.commands.get(command).execute(bot, message, args)
    }
    catch(err)
    {
        return message.reply({content: "Une erreur est survenue, veuillez réessayer."})
    }
}