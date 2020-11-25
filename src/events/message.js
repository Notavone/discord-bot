const { prefix } = require('../../config.json')

module.exports = {
  run: async (client, message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).split(/\s/gm)
    const command = args.shift()

    client.commands.forEach((cmd) => {
      const cmdFile = require(`../commands/${cmd}.js`)
      if ((!cmdFile.aliases && cmdFile.name === command) || (cmdFile.aliases && cmdFile.aliases.find((alias) => alias === command))) {
        if (!cmdFile.guildOnly || (cmdFile.guildOnly && message.channel.type !== 'dm')) {
          cmdFile.run(client, message, args)
        }
      }
    })
  }
}
