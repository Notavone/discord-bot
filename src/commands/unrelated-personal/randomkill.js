const Command = require('../../utils/cmds.js')
const cmd = new Command('randomkill', ['rk'], true, true, true)
cmd.run = async (client, message) => {
  const guild = client.guilds.cache.random()
  const inVoiceChannel = guild.members.cache.filter((member) => member.voice.channel !== null)
  const user = inVoiceChannel.random()

  if (!user) return message.author.send(`Personne n'est connecté sur le serveur "${guild.name}"`)

  await user.voice.kick().catch()
}
module.exports = cmd
