const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new Discord.Client()
const token = process.env.TOKEN

const eventsFiles = fs.readdirSync('./src/events/')
const events = eventsFiles.map((event) => event.slice(0, -3))

const commandsFiles = fs.readdirSync('./src/commands')
const commands = commandsFiles.map((command) => command.slice(0, -3))
client.commands = commands

events.forEach((event) => {
    const eventFile = require(`./events/${event}.js`)
    client.on(event, (...args) => {
        eventFile.run(client, ...args)
    })
})

client.login(token).then((r) => console.log(`Token : ${r}`))
