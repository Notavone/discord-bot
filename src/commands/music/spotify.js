const Discord = require('discord.js')
const Command = require('../../utils/cmds.js')
const { ServerQueue, getSpotifyVideo } = require('../../utils/music.js')
const cmd = new Command('spotify', [], true, false, false)
cmd.run = async (client, message) => {
  const guildID = message.guild.id
  const queue = client.queues.get(guildID)
  const voiceChannel = message.member.voice.channel
  const voiceConnection = await voiceChannel.join()
  if (!voiceChannel || !voiceConnection) throw new Error('veuillez rejoindre un salon vocal, ou m\'autoriser à rejoindre votre salon')
  const video = await getSpotifyVideo(client, message.author)
  if (!video) throw new Error('aucune musique trouvée')

  if (!queue) {
    const queue = new ServerQueue(client, voiceConnection, guildID, message.channel, [video])
    client.queues.set(queue.getGuildID(), queue)
    await queue.enableSpotifyLink(message.author)
    await voiceConnection.voice.setDeaf(true)
  } else {
    const embed = new Discord.MessageEmbed()
      .setDescription('Veuillez attendre que la file d\'attente se termine avant de lancer une session d\'écoute')
    await message.channel.send(embed)
  }
}
module.exports = cmd
