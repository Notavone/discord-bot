const Discord = require('discord.js')
const leadingZero = require('../../utils/functions')
const Command = require('../../utils/cmds.js')
const cmd = new Command('userinfo', ['ui', 'info', 'uinfo'], true, false)
cmd.run = async (client, message) => {
  const mention = message.mentions.users.size > 0 ? message.mentions.users.first() : message.author
  const date = mention.createdAt
  const embed = new Discord.MessageEmbed()
    .setTitle('Informations')
    .setDescription(`Date d'inscription : ${leadingZero(date.getDate())}/${leadingZero(date.getMonth() + 1)}/${leadingZero(date.getFullYear())}`)

  await message.channel.send(embed)
}
module.exports = cmd
