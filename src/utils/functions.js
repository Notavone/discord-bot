module.exports.leadingZero = (number) => {
  return Number(number) < 10 ? '0' + number : number
}

module.exports.arrayDivider = (array, max) => {
  const finalArray = []
  const division = array.length / max
  for (let i = 0; i < division; i++) {
    finalArray.push(array.slice(i * max, i * max + max))
  }
  return finalArray
}
