const Discord = require('discord.js')
const { arrayDivider } = require('../../utils/functions.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('queue', [], true, false)
cmd.run = async (client, message) => {
  const guildID = message.guild.id
  const queue = client.queues.get(guildID)

  const embed = new Discord.MessageEmbed()
  if (!queue) {
    embed.setDescription('Il n\'y a pas de file d\'attente pour ce serveur')
    return message.channel.send(embed)
  }

  await displayPageAndCreateCollector(0)

  async function displayPageAndCreateCollector (page, msg) {
    const maxVidPerPage = 10
    const dividedQueue = arrayDivider(queue.getVideos(), maxVidPerPage)
    if (dividedQueue.length === 0) return

    const options = {
      time: 1000 * queue.getVideos()[0].getDuration()
    }

    console.log(dividedQueue)
    const description = dividedQueue[page].map((video, i) => `**#${i + page * maxVidPerPage + 1}** - **__[${video.getTitle()}](${video.getURL()})__** ${video.getDuration() ? `(${video.getDuration()}sec)` : ''}`).join('\n')
    embed.setDescription(description + `\nPage **${page + 1}/${dividedQueue.length}**`)

    if (!msg) msg = await message.channel.send(embed)
    else await msg.edit(embed)

    if (dividedQueue.length > 1) {
      await msg.reactions.cache.forEach((reaction) => reaction.remove())

      await msg.react('⬅️')
      const backCollector = msg.createReactionCollector((reaction) => reaction.emoji.name === '⬅️', options)
      backCollector.on('collect', async (r) => {
        await r.remove()
        backCollector.stop()
        resetCollector.stop()
        forwardCollector.stop()
        return displayPageAndCreateCollector(page - 1 < 0 ? page : page - 1, msg)
      })

      await msg.react('🛑')
      const resetCollector = msg.createReactionCollector((reaction) => reaction.emoji.name === '🛑', options)
      resetCollector.on('collect', async (r) => {
        await r.remove()
        backCollector.stop()
        resetCollector.stop()
        forwardCollector.stop()
        return displayPageAndCreateCollector(0, msg)
      })

      await msg.react('➡️')
      const forwardCollector = msg.createReactionCollector((reaction) => reaction.emoji.name === '➡️', options)
      forwardCollector.on('collect', async (r) => {
        await r.remove()
        backCollector.stop()
        resetCollector.stop()
        forwardCollector.stop()
        return displayPageAndCreateCollector(page + 1 > dividedQueue.length ? page : page + 1, msg)
      })
    }
  }
}
module.exports = cmd
