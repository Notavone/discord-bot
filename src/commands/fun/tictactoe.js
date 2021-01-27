const Command = require('../../utils/cmds.js')
const cmd = new Command('tic-tac-toe', ['ttt'], true)
cmd.run = async (client, message) => {
  const emojis = ['❌', '🟢']
  const users = [message.author, message.mentions.users.first()]
  let i = 0
  const n = 3
  const grid = createGrid(n)
  do {
    const playerNo = i % 2
    const player = users[playerNo]
    const emoji = emojis[playerNo]
    const filter = (m) => { return m.author === player && !isNaN(m.content) }
    const collection = await message.channel.awaitMessages(filter, { max: 1, time: 20000 })
    if (!collection.first()) return message.reply('Aucune réponse n\'a été enregistrée, arrêt de la partie.')
    const number = Number(collection.first().content) - 1
    if (number >= 0 && number <= n ** 2 - 1) {
      const row = Math.floor(number / n)
      const col = number % n
      if (grid[row][col] === '❔') {
        grid[row][col] = emoji
        i++
        await message.channel.send(grid.map((row) => row.join('')).join('\n'))
        if (grid.find((row) => checkRow(row) === true) || checkCol(grid) || checkDiag(grid)) return message.channel.send(`${player.username} à gagné!`)
      } else {
        await message.channel.send('Nope, tricheur va!')
      }
    }
  } while (grid.find((p) => p.includes('❔')))
  await message.channel.send('Personne n\'a gagné, vous êtes tous nuls')
}
module.exports = cmd

function createGrid (n) {
  const grid = []
  for (let i = 0; i < n; i++) {
    grid[i] = []
    for (let j = 0; j < n; j++) {
      grid[i][j] = '❔'
    }
  }
  return grid
}

function checkRow (row) {
  return !row.includes('❔') && (!row.includes('❌') || !row.includes('🟢'))
}

function checkCol (grid) {
  const n = grid[0].length
  for (let i = 0; i < n; i++) {
    if (checkRow(grid.map((row) => row[i]))) return true
  }
  return false
}

function checkDiag (grid) {
  const n = grid[0].length
  const diag1 = []
  const diag2 = []
  for (let i = 0; i < n; i++) {
    diag1.push(grid[i][i])
  }
  for (let i = 0, j = n - 1; i < n; i++, j--) {
    diag2.push(grid[i][j])
  }
  return checkRow(diag1) || checkRow(diag2)
}
