const Discord = require('discord.js')
module.exports = {
    name: 'help',
    aliases: ['aled'],
    description: 'Commande d\'aide',
    syntax: 'help <commande>',
    run: async (client, message, args) => {
        const commands = []
        client.commands.forEach((command) => {
            commands.push(require(`./${command}.js`))
        })

        let command
        if (args[0]) {
            command = commands.find((command) => command.name === args[0] || (command.aliases && command.aliases.includes(args[0])))
        }

        const embed = new Discord.MessageEmbed()
        if (!args[0] || !command) {
            embed
                .setTitle('Commandes disponibles')
                .setDescription(client.commands.join('\n'))
        } else {
            let description = ''
            if (command.aliases) description += `**Alias :**\n${command.aliases.join('\n')}\n`
            if (command.description) description += `**Description :**\n${command.description}\n`
            if (command.syntax) description += `**Syntaxe :**\n${command.syntax}\n`

            embed.setTitle(`Aide pour la commande "${command.name}"`)
            embed.setDescription(description)
        }

        await message.channel.send(embed)
    }
}
