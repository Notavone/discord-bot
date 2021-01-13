const Discord = require('discord.js')
const { getFilesRecursive } = require('./utils/functions.js')
require('dotenv').config()

const client = new Discord.Client()
const token = process.env.TOKEN

getFilesRecursive('./src/events')
  .map((event) => event.split('events/').pop().slice(0, -3))
  .forEach((event) => {
    const eventFile = require(`./events/${event}.js`)
    client.on(event, (...args) => {
      eventFile.run(client, ...args)
    })
  })

client.commands = getFilesRecursive('./src/commands')
  .map((command) => require(`./commands/${command.split('commands/').pop()}`))

client.queues = new Discord.Collection()

client.login(token).then((r) => console.log(`Token : ${r}`))
