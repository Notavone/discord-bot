module.exports = {
  name: 'avatar',
  aliases: ['pp'],
  guildOnly: true,
  run: async (client, message) => {
    if (message.mentions.users.size < 1) {
      await message.channel.send(getAvatarUrl(message.author))
    } else {
      message.mentions.users.forEach((user) => {
        message.channel.send(getAvatarUrl(user))
      })
    }
  }
}

function getAvatarUrl (user) {
  return user.avatarURL({ dynamic: true }) || `Aucune image pour ${user.username}`
}
