const Discord = require('discord.js')

module.exports = {
  name: 'poll',
  run: async (client, message, args) => {
    args = args.join(' ')
    const regionalIndicators = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯']

    const qMatch = /{(.+?)}/.exec(args)
    let options = [...args.matchAll(/\[(.+?)]/gm)].map((match) => match[1])

    if (!qMatch) throw new Error('Pas de question')
    if (options.length > regionalIndicators.length) throw new Error('Trop de propositions')
    if (options.length === 1) throw new Error('Pas assez de propositions')

    if (options.length === 0) options = ['Oui', 'Non']

    const question = qMatch[1]

    let description = ''
    for (let i = 0; i < options.length; i++) {
      description += `\n\n${regionalIndicators[i]} ${options[i]}`
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(question)
      .setColor('#83BAE3')
      .setDescription(description)

    const msg = await message.channel.send(embed)

    for (let i = 0; i < options.length; i++) {
      await msg.react(regionalIndicators[i])
    }
  }
}
