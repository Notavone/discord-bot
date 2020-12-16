const Discord = require('discord.js')
const leadingZero = require('../functions/leadingZero')

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'info', 'uinfo'],
  guildOnly: true,
  run: async (client, message) => {
    const mention = message.mentions.size > 0 ? message.mentions.first : message.author
    const date = mention.createdAt
    const embed = new Discord.MessageEmbed()
      .setTitle('Informations')
      .setDescription(`Date d'inscription : ${leadingZero(date.getDate())}/${leadingZero(date.getMonth())}/${leadingZero(date.getFullYear())}`)

    await message.channel.send(embed)
  }
}
