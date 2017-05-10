'use strict'

const include = require('./utils').include
const parseOptions = require('./utils').parseOptions
const isADirectory = require('./directory').isADirectory
const getDirectoryFiles = require('./directory').getDirectoryFiles
const findInFile = require('./file').findInFile

/**
 * PositionInFile main method.
 * @param  {string} needle   The element to search.
 * @param  {string}  haystack Where the research will be executed.
 * @param  {object} options  Some aditionnals options.
 * @return {object} The result.
 */
module.exports = function positionInFile (needle, haystack, options) {
  options = parseOptions(options)
  const ignore = options.ignore

  if (!needle) return console.log('A valid `needle` parameter is required')
  if (!haystack) haystack = [__dirname]
  else if (!Array.isArray(haystack)) haystack = [haystack]

  const files = haystack.reduce(function (prev, element) {
    if (include(element, ignore)) return prev
    const isDirectory = isADirectory(element)
    if (isDirectory) return prev.concat(getDirectoryFiles(element, options))
    return Array.from(prev).concat([element])
  }, [])

  const result = files.reduce(function (prev, file) {
    const lines = findInFile(needle, file)
    return lines ? prev.concat({file: file, lines: lines}) : prev
  }, [])
  return result
}
