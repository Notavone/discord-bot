const Command = require('../utils/cmds')
const cmd = new Command('ping')
cmd.run = (client, message) => {
  message.reply('pong!')
}
module.exports = cmd
