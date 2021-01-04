const Discord = require('discord.js')

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  run: async (client, message, args) => {
    const guildID = message.guild.id
    const queue = client.queues.get(guildID)

    const embed = new Discord.MessageEmbed()
    if (!queue) {
      embed.setDescription('Il n\'y a pas de file d\'attente pour ce serveur')
      return message.channel.send(embed)
    }
    const oldVolume = queue.getVolume()
    const newVolume = args[0]

    if (oldVolume === newVolume) {
      embed.setDescription(`Le volume est déjà réglé sur **${newVolume}**`)
      return message.channel.send(embed)
    }

    try {
      queue.setVolume(newVolume)
      embed.setDescription(`Volume : **${oldVolume}** -> **${newVolume}**`)
    } catch (e) {
      embed.setDescription(e.message)
    }

    await message.channel.send(embed)
  }
}
