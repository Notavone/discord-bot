const { admins } = require('../../config.json')

module.exports = class Command {
  /**
   *
   * @param {String} name
   * @param {[String] || null} aliases
   * @param {Boolean || null} gOnly
   * @param {Boolean || null} aOnly
   * @param {Boolean || null} oOnly
   * @param {String || null} description
   * @param {String || null} syntax
   * @param {String || null} group
   */
  constructor (name, aliases, gOnly, aOnly, oOnly, description, syntax, group) {
    this.name = name
    this.aliases = aliases || []
    this.guildOnly = gOnly || true
    this.adminOnly = aOnly || false
    this.ownerOnly = oOnly || false
    this.description = description || ''
    this.syntax = syntax || ''
    this.group = group || ''
  }

  /**
   *
   * @param {Discord.Message} message
   */
  canExecute (message) {
    if (!message.guild && this.guildOnly) return false
    if (this.ownerOnly && admins.has(message.author.id)) return true
    return !(this.adminOnly && (!message.guild || !message.member.permissions.has('ADMINISTRATOR')))
  }

  run (client, message) {
    return message.reply('Debug : this command is not written yet')
  }
}
