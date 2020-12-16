const { prefix, admins } = require('../../config.json')

module.exports = {
  run: async (client, message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).split(/\s/gm)
    const command = args.shift()
    const commands = []
    client.commands.forEach((command) => {
      commands.push(require(`../commands/${command}.js`))
    })

    const cmdFile = commands.find((cmd) => cmd.name === command || (cmd.aliases && cmd.aliases.includes(command)))

    if (cmdFile) {
      if (!cmdFile.guildOnly || (cmdFile.guildOnly && message.guild)) {
        if (!cmdFile.adminOnly || (cmdFile.adminOnly && ((message.guild && message.member.permissions.has('ADMINISTRATOR', true)) || admins.includes(message.author.id)))) {
          cmdFile.run(client, message, args)
        }
      }
    }
  }
}
