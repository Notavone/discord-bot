const { Group } = require('../../utils/edt.js')
const Command = require('../../utils/cmds.js')
const cmd = new Command('edt', [], false, false)
cmd.run = async (client, message, args) => {
  const groupName = args[0].toLowerCase()
  const week = args[1]
  const groups = [
    new Group('s1', 4641),
    new Group('s1-a', 4670),
    new Group('s1-a1', 4673),
    new Group('s1-a2', 4674),
    new Group('s1-b', 4668),
    new Group('s1-b1', 4676),
    new Group('s1-b2', 4675),
    new Group('s1-c', 4669),
    new Group('s1-c1', 4677),
    new Group('s1-c2', 4678),
    new Group('s1-d', 4671),
    new Group('s1-d1', 4679),
    new Group('s1-d2', 4680),
    new Group('s2', 4683),
    new Group('s2-a', 4690),
    new Group('s2-a1', 4691),
    new Group('s2-a2', 4692),
    new Group('s2-b', 4684),
    new Group('s2-b1', 4685),
    new Group('s2-b2', 4686),
    new Group('s2-c', 4687),
    new Group('s2-c1', 4688),
    new Group('s2-c2', 4689),
    new Group('s2-d', 4693),
    new Group('s2-d1', 4694),
    new Group('s2-d2', 4695),
    new Group('s3', 4699),
    new Group('s3-a', 4706),
    new Group('s3-a1', 4707),
    new Group('s3-a2', 4708),
    new Group('s3-b1', 4701),
    new Group('s3-b', 4700),
    new Group('s3-b2', 4702),
    new Group('s3-c', 4703),
    new Group('s3-c1', 4704),
    new Group('s3-c2', 4705),
    new Group('s3-d', 4709),
    new Group('s3-d1', 4710),
    new Group('s3-d2', 4711),
    new Group('s4', 10873),
    new Group('s4-a', 10878),
    new Group('s4-a1', 10874),
    new Group('s4-a2', 10875),
    new Group('s4-b', 10879),
    new Group('s4-b1', 10876),
    new Group('s4-b2', 10877),
    new Group('s4-c', 16236),
    new Group('s4-c1', 16238),
    new Group('s4-c2', 19973)
  ]
  const group = groups.find((grp) => grp.getName() === groupName)

  if (!group) return message.reply('Erreur')
  await group.displayEDT(message, week)
}
module.exports = cmd
