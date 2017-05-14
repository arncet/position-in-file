const positionInFile = require('./src')
const inspect = require('util').inspect

console.log(inspect(positionInFile(/@todo/, '../lelivrescolaire-front/src'), {showHidden: false, depth: null}))
