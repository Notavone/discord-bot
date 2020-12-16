module.exports = {
  name: 'avatar',
  aliases: ['pp'],
  guildOnly: true,
  run: async (client, message) => {
    if (message.mentions.size < 1) {
      await message.channel.send(getAvatarUrl(message.author))
    } else {
      message.mentions.members.forEach((member) => {
        message.channel.send(getAvatarUrl(member.user))
      })
    }
  }
}

function getAvatarUrl (user) {
  return user.avatarURL({ dynamic: true }) || `Aucune image pour ${user.username}`
}
