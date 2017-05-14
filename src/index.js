'use strict'

const include = require('./utils').include
const parseOptions = require('./utils').parseOptions
const isADirectory = require('./directory').isADirectory
const findInDirectory = require('./directory').findInDirectory
const findInFile = require('./file').findInFile

/**
 * PositionInFile main method.
 * @param  {string} needle   The element to search.
 * @param  {string}  haystack Where the research will be executed.
 * @param  {object} options  Some aditionnals options.
 * @return {object} The result.
 */
module.exports = function positionInFile (needle, haystack, options) {
  const parsedOptions = parseOptions(options)
  const ignore = parsedOptions.ignore

  if (!needle) return console.log('A valid `needle` parameter is required')
  if (!haystack) haystack = __dirname

  const result = (function () {
    if (include(haystack, ignore)) return []
    if (isADirectory(haystack)) return findInDirectory(needle, haystack, parsedOptions)
    const lines = findInFile(needle, haystack)
    return Object.keys(lines).length ? [{file: haystack, lines: lines}] : []
  })()

  return result
}
