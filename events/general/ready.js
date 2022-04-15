module.exports = async (bot) => {
    console.log(`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','Connecting...')
    console.log(`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','API connection Discord in progress')
    console.log(`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m', 'API connection Discord done')
    console.log(`\x1b[36m%s\x1b[0m`,'[INFO]', '\x1b[0m','Connected as ' + bot.user.username + '#' + bot.user.discriminator)
    console.log(`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Loading complete')
    console.log(`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Ready and connected')
    console.log("")
}
