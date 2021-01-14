const Discord = require('discord.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('changeGroup', ['chgroup'], true, true, false)
cmd.run = async (client, message) => {
  const memberMentions = [...message.content.matchAll(/<@(!)?(\d{18})>/gm)].map((match) => message.guild.members.cache.get(match[2]))
  const roleMentions = [...message.content.matchAll(/<@&(\d{18})>/gm)].map((match) => message.guild.roles.cache.get(match[1]))

  if (memberMentions.length > 0 && roleMentions.length > 0) {
    if (roleMentions.length > 1) {
      for (const member of memberMentions) { await member.roles.remove(roleMentions.shift().id) }
    }
    for (const member of memberMentions) { await member.roles.add(roleMentions.pop().id) }
    const embed = new Discord.MessageEmbed()
      .setDescription(`Changement de groupe pour ${memberMentions.length} personnes`)
    return await message.channel.send(embed)
  }

  if (roleMentions.length > 1) {
    const toRemove = roleMentions.shift()
    const toAdd = roleMentions.pop()
    for (const member of toRemove.members.array()) {
      await member.roles.remove(toRemove.id)
      await member.roles.add(toAdd.id)
    }
    const embed = new Discord.MessageEmbed()
      .setDescription(`${toRemove.name} ➡ ️${toAdd.name}`)
    return await message.channel.send(embed)
  }
}
module.exports = cmd
