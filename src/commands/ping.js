module.exports = {
    name: 'ping',
    aliases: ['pong'],
    run: (client, message) => {
        message.reply('Pong!')
    }
}
