const { prefix } = require('../../config.json')

module.exports = {
  run: async (client, message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).split(/\s/gm)
    const commandArg = args.shift()
    const command = client.commands.find((cmd) => cmd.name === commandArg || (cmd.aliases && cmd.aliases.includes(commandArg)))

    if (command && command.canExecute(message)) {
      command.run(client, message, args)
        .catch((e) => {
          message.reply(e.message)
          console.error(e)
        })
    }
  }
}
