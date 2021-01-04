const Discord = require('discord.js')

module.exports = {
  name: 'skip',
  aliases: ['sk'],
  guildOnly: true,
  run: async (client, message, args) => {
    const guildID = message.guild.id
    const nb = args[0]
    const queue = client.queues.get(guildID)

    const embed = new Discord.MessageEmbed()
      .setDescription('Il n\'y a pas de file d\'attente pour ce serveur')
    if (!queue) return message.channel.send(embed)
    await queue.skip(true)
  }
}
