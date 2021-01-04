const { Group } = require('../utils/edt.js')

module.exports = {
  name: 'edt',
  aliases: ['iut'],
  help: 'Permet de récupérer l\'emploi du temps d\'un groupe en fonction de la semaine',
  syntax: 'edt <group> [<1-5>]',
  run: async (client, message, args) => {
    const groupName = args[0].toLowerCase()
    const week = args[1]
    const groups = [
      new Group('s1-a1', 4673),
      new Group('s1-a2', 4674),
      new Group('s1-b1', 4676),
      new Group('s1-b2', 4675),
      new Group('s1-c1', 4677),
      new Group('s1-c2', 4678),
      new Group('s1-d1', 4679),
      new Group('s2-a1', 4691),
      new Group('s2-a2', 4692),
      new Group('s2-b1', 4685),
      new Group('s2-b2', 4686),
      new Group('s2-c1', 4688),
      new Group('s2-c2', 4689),
      new Group('s2-d1', 4694),
      new Group('s3-a1', 4707),
      new Group('s3-a2', 4708),
      new Group('s3-b1', 4701),
      new Group('s3-b2', 4702),
      new Group('s3-c1', 4704),
      new Group('s3-c2', 4705),
      new Group('s4-a1', 10874),
      new Group('s4-a2', 10875),
      new Group('s4-b1', 10876),
      new Group('s4-b2', 10877),
      new Group('s4-c1', 16238),
      new Group('s4-c2', 19973)
    ]
    const group = groups.find((grp) => grp.getName() === groupName)

    if (!group) return message.reply('Erreur')
    await group.displayEDT(message, week)
  }
}
