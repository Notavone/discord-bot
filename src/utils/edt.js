const Discord = require('discord.js')
const request = require('request')

class Group {
  /**
   *
   * @param {String} groupName
   * @param {Number} groupID
   */
  constructor (groupName, groupID) {
    this.name = groupName
    this.id = groupID
  }

  getName () {
    return this.name
  }

  getID () {
    return this.id
  }

  async displayEDT (message, week) {
    week = Math.floor(isNaN(week) ? 1 : Number(week) > 5 ? 6 : Number(week) < 1 ? 1 : Number(week)) + 1
    await request(`https://sedna.univ-fcomte.fr/jsp/custom/ufc/mplanif.jsp?id=${this.id.toString()}&jours=${(7 * week).toString()}`, async (err, res, body) => {
      if (err) throw err
      const url = body.match(/<a href="(.*)">Affichage planning<\/a>/)[1].replace(/&width=[0-9]*&height=[0-9]*&/, '&width=1080&height=720&')
      const embed = new Discord.MessageEmbed()
        .setDescription(`EDT du groupe ${this.name.toUpperCase()} (${week === 1 ? 'semaine actuelle' : `semaine +${week - 1}`})`)
        .setImage(url)
      await message.channel.send(embed)
    })
  }
}

module.exports.Group = Group
