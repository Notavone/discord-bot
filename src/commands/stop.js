const Discord = require('discord.js')

module.exports = {
  name: 'stop',
  aliases: ['s'],
  run: async (client, message) => {
    const guildID = message.guild.id
    const queue = client.queues.get(guildID)

    const embed = new Discord.MessageEmbed()
      .setDescription('Il n\'y a pas de file d\'attente pour ce serveur')
    if (!queue) return message.channel.send(embed)
    queue.stop()
  }
}
