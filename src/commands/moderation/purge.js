const Discord = require('discord.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('purge', ['clear'], true, true, false)
cmd.run = async (client, message, args) => {
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 100) throw new Error('merci d\'entrer un nombre entre 1 et 100')
  const deleted = await message.channel.bulkDelete(args[0], true)
  const embed = new Discord.MessageEmbed()
    .setDescription(`${Array.from(deleted).length} messages supprimés!`)
  return await message.channel.send(embed)
}
module.exports = cmd
