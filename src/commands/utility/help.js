const Discord = require('discord.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('help', ['aled'], false, false)
cmd.run = async (client, message, args) => {
  const command = client.commands.find((command) => command.name === args[0] || (command.aliases && command.aliases.includes(args[0])))

  const embed = new Discord.MessageEmbed()
  if (!args[0] || !command) {
    embed
      .setTitle('Commandes disponibles')
      .setDescription(client.commands.map((cmd) => cmd.name).join('\n'))
  } else {
    let description = ''
    if (command.aliases.length > 1) description += `**Alias :**\n${command.aliases.join('\n')}\n`
    if (command.description) description += `**Description :**\n${command.description}\n`
    if (command.syntax) description += `**Syntaxe :**\n${command.syntax}\n`

    embed.setTitle(`Aide pour la commande "${command.name}"`)
    embed.setDescription(description)
  }

  await message.channel.send(embed)
}
module.exports = cmd
