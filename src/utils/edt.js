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
    week = week === undefined ? 1 : Number(week)
    if (isNaN(week)) throw new Error('week is NaN')
    await request(`https://sedna.univ-fcomte.fr/jsp/custom/ufc/mplanif.jsp?id=${this.id.toString()}&jours=${(7 * week).toString()}`, async (err, res, body) => {
      if (err) throw err
      const url = body.match(/<a href="(.*)">Affichage planning<\/a>/)[1].replace(/&width=[0-9]*&height=[0-9]*&/, '&width=1080&height=720&')
      console.log(url)
      const embed = new Discord.MessageEmbed()
        .setDescription(`EDT du groupe ${this.name.toUpperCase()}`)
        .setImage(url)
      await message.channel.send(embed)
    })
  }
}

module.exports.Group = Group
