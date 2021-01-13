const Command = require('../../utils/cmds.js')
const cmd = new Command('avatar', ['pp'], false, false)
cmd.run = async (client, message) => {
  if (message.mentions.users.size < 1) {
    await message.channel.send(getAvatarUrl(message.author))
  } else {
    message.mentions.users.forEach((user) => {
      message.channel.send(getAvatarUrl(user))
    })
  }
}
module.exports = cmd

function getAvatarUrl (user) {
  return user.avatarURL({ dynamic: true }) || `Aucune image pour ${user.username}`
}
