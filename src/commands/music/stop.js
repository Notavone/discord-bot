const Discord = require('discord.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('stop', ['s'], true, false)
cmd.run = async (client, message) => {
  const guildID = message.guild.id
  const queue = client.queues.get(guildID)

  const embed = new Discord.MessageEmbed()
    .setDescription('Il n\'y a pas de file d\'attente pour ce serveur')
  if (!queue) return message.channel.send(embed)
  queue.stop()
}
module.exports = cmd
