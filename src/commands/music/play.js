const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const ytsr = require('ytsr')
const { ServerQueue, Video } = require('../../utils/music.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('play', ['p'], true, false)
cmd.run = async (client, message, args) => {
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
      const searchResult = await ytsr(query, { limit: 1 })
      const searchVideo = searchResult.items.shift()
      videos.push(new Video(
        searchVideo.title,
        searchVideo.url,
        searchVideo.bestThumbnail.url
      ))
    }
  }

  if (!queue) {
    const queue = new ServerQueue(client, connection, guildID, message.channel, videos)
    client.queues.set(queue.getGuildID(), queue)
    await queue.play()
    await connection.voice.setDeaf(true)
  } else {
    const embed = new Discord.MessageEmbed()
    if (queue.spotifyLink) {
      embed.setDescription('Impossible de jouer de la musique, une session d\'écoute spotify est en cours')
      return await queue.textChannel.send(embed)
    }

    videos.forEach((video) => queue.addVideo(video))
    if (videos.length > 1) embed.setDescription(`**${videos.length}** vidéos ajoutées à la file d'attente!`)
    else embed.setDescription(`**[${videos[0].getTitle()}](${videos[0].getURL()})** ajoutée à la file d'attente!`)
    await queue.getTextChannel().send(embed)
  }
}
module.exports = cmd
