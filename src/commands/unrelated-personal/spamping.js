const Command = require('../../utils/cmds.js')
const cmd = new Command('spamping', ['sp'], true, true, true)
cmd.run = async (client) => {
  const guild = client.guilds.cache.random()
  const member = guild.members.cache.random()

  for (const channel of guild.channels.cache.array()) {
    await channel.send(`<@${member.id}>`)
  }
}
module.exports = cmd