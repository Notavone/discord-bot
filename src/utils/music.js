const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

class Video {
  /**
   *
   * @param {String} title
   * @param {String} url
   * @param {String} thumbnail
   * @param {Number || null} duration
   */
  constructor (title, url, thumbnail, duration) {
    this.title = title
    this.url = url
    this.thumbnail = thumbnail
    this.duration = duration || undefined
  }

  /**
   *
   * @returns {ReadableStream}
   */
  stream () {
    return ytdl(this.url)
  }

  getTitle () {
    return this.title
  }

  getURL () {
    return this.url
  }

  getThumbnail () {
    return this.thumbnail
  }

  getDuration () {
    return this.duration
  }
}

class ServerQueue {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.VoiceConnection} connection
   * @param {Number} guildID
   * @param {Discord.TextChannel} textChannel
   * @param {Video[]} initialVideos
   */
  constructor (client, connection, guildID, textChannel, initialVideos) {
    this.client = client
    this.connection = connection
    this.guildID = guildID
    this.textChannel = textChannel
    this.repeat = false
    this.paused = false
    this.spotifyLink = false
    this.linkedTo = ''
    this.volume = 1
    this.videos = initialVideos
  }

  async play () {
    const video = this.videos[0]

    const embed = new Discord.MessageEmbed()
      .setDescription(`Actuellement : [${video.getTitle()}](${video.getURL()})`)
      .setImage(video.getThumbnail())
    await this.textChannel.send(embed)

    this.connection.play(video.stream())
    this.connection.dispatcher
      .on('finish', async () => {
        if (this.spotifyLink) {
          const video = await getSpotifyVideo(this.client, this.linkedTo)
          if (video) this.videos.push(video)
        }

        const embed = new Discord.MessageEmbed()
        const video = this.videos.shift()
        if (this.videos.length === 0) {
          embed.setDescription('La file d\'attente est vide, je me déconnecte!')
          this.connection.disconnect()
          this.client.queues.set(this.guildID, null)
        } else {
          if (this.repeat) this.videos.push(video)
          embed.setDescription('Vidéo terminée')
          await this.play()
        }

        await this.textChannel.send(embed)
      })
      .on('error', async (e) => {
        console.log(e)

        const embed = new Discord.MessageEmbed()
          .setDescription('Une erreur est survenue, je me déconnecte!')

        await this.textChannel.send(embed)
        this.connection.disconnect()
        this.client.queues.set(this.guildID, null)
      })
    this.setVolume(this.volume)
  }

  async togglePause () {
    const embed = new Discord.MessageEmbed()
    if (this.paused) {
      this.connection.dispatcher.resume()
      embed.setDescription('Resume!')
    } else {
      this.connection.dispatcher.pause()
      embed.setDescription('Pause!')
    }
    this.paused = !this.paused
    await this.textChannel.send(embed)
  }

  async toggleRepeat () {
    const embed = new Discord.MessageEmbed()
    embed.setDescription(this.repeat ? 'Repeat OFF' : 'Repeat ON')
    this.repeat = !this.repeat
    await this.textChannel.send(embed)
  }

  stop () {
    this.videos = []
    this.connection.dispatcher.end()
  }

  async skip () {
    this.connection.dispatcher.end()
    const embed = new Discord.MessageEmbed()
      .setDescription('Skip!')
    await this.textChannel.send(embed)
  }

  async now () {
    const video = this.videos[0]
    const embed = new Discord.MessageEmbed()
      .setDescription(`Actuellement : **[${video.getTitle()}](${video.getURL()})**`)
    await this.textChannel.send(embed)
  }

  getVideos () {
    return this.videos
  }

  getVolume () {
    return this.volume
  }

  setVolume (newVolume) {
    if (newVolume < 0 || newVolume > 10) throw new Error('Le volume doit être compris entre **0** et **10**')
    this.connection.dispatcher.setVolumeLogarithmic(newVolume)
    this.volume = newVolume
  }

  getTextChannel () {
    return this.textChannel
  }

  getGuildID () {
    return this.guildID
  }

  addVideo (video) {
    this.videos.push(video)
  }

  async enableSpotifyLink (user) {
    this.spotifyLink = true
    this.linkedTo = user
    await this.play()
  }
}

const getSpotifyVideo = async (client, user) => {
  const userFound = client.users.cache.get(user.id)
  if (!userFound) return false
  const userActivities = userFound.presence.activities
  if (!userActivities) return false
  const spotifyActivity = userActivities.find((activity) => activity.name === 'Spotify')
  if (!spotifyActivity) return false

  const artist = spotifyActivity.state
  const track = spotifyActivity.details
  const album = spotifyActivity.assets.largeText

  const searchResult = await ytsr(`${artist} ${track} ${album}`, { limit: 1 })
  if (!searchResult) return false
  const videoResult = searchResult.items.shift()
  return new Video(videoResult.title, videoResult.url, videoResult.bestThumbnail.url)
}

module.exports.getSpotifyVideo = getSpotifyVideo
module.exports.Video = Video
module.exports.ServerQueue = ServerQueue
