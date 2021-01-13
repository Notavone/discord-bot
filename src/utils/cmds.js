const { admins } = require('../../config.json')

module.exports = class Command {
  /**
   *
   * @param {String} name
   * @param {[String] || null} aliases
   * @param {Boolean || null} gOnly
   * @param {Boolean || null} aOnly
   * @param {String || null} description
   * @param {String || null} syntax
   * @param {String || null} group
   */
  constructor (name, aliases, gOnly, aOnly, description, syntax, group) {
    this.name = name
    this.aliases = aliases || []
    this.guildOnly = gOnly || true
    this.adminOnly = aOnly || false
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
    return !(this.adminOnly && !admins.has(message.author.id))
  }

  run (client, message) {
    return message.reply('Debug : this command is not written yet')
  }
}
