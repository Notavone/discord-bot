const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const ytsr = require('ytsr')
const { ServerQueue, Video } = require('../utils/music.js')

module.exports = {
  name: 'play',
  aliases: ['p'],
  guildOnly: true,
  run: async (client, message, args) => {
    const guildID = message.guild.id
    const query = args.join()
    const queue = client.queues.get(guildID)
    const connection = await message.member.voice.channel.join()
    const videos = []

    try {
      const playlist = await ytpl(query)
      playlist.items.forEach((item) => {
        videos.push(new Video(
          item.title,
          item.shortUrl,
          item.bestThumbnail.url,
          item.durationSec
        ))
      })
    } catch (e) {
      try {
        const videoInfo = (await ytdl.getBasicInfo(query)).videoDetails
        videos.push(new Video(
          videoInfo.title,
          videoInfo.video_url,
          videoInfo.thumbnails.pop().url,
          videoInfo.lengthSeconds
        ))
      } catch (e) {
        const searchResult = await ytsr(query, {
          limit: 1
        })
        videos.push(new Video(
          searchResult.items[0].title,
          searchResult.items[0].url,
          searchResult.items[0].bestThumbnail.url,
          undefined
        ))
      }
    }

    if (!queue) {
      const queue = new ServerQueue(client, connection, guildID, message.channel, videos)
      client.queues.set(queue.getGuildID(), queue)
      await queue.play()
      await connection.voice.setDeaf(true)
    } else {
      videos.forEach((video) => queue.addVideo(video))
      const embed = new Discord.MessageEmbed()
      if (videos.length > 1) embed.setDescription(`**${videos.length}** vidéos ajoutées à la file d'attente!`)
      else embed.setDescription(`**[${videos[0].getTitle()}](${videos[0].getURL()})** ajoutée à la file d'attente!`)
      await queue.getTextChannel().send(embed)
    }
  }
}
