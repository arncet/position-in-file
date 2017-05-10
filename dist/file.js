const fs = require('fs')
const extName = require('ext-name')
const include = require('./utils').include
const bufferToString = require('./utils').bufferToString
const findInLine = require('./line').findInLine

/**
 * All ignored mimes types
 */
const MIME_TYPES_IGNORED = [/audio/, /video/, /image/]

/**
 * Find if a file's mime type is contained on the MIME_TYPES_IGNORED array.
 * @params {string}  file The file to look for.
 * @return {boolean} If MIME_TYPES_IGNORED contain file's mime type.
 */
function includeMimeType (file) {
  const ext = extName(file)
  if (!ext) return false
  return !!include(ext.mime, MIME_TYPES_IGNORED)
}

/**
 * Get all line of given file.
 * @param  {string} file The file given.
 * @return {obect}  An object where the key represent the line number
                    and where the value represent the line's content (octet).
 */
function getFileLines (file) {
  const END_OF_LINE = 10
  const buffer = fs.readFileSync(file)
  var currentLine = 1
  const lines = {}
  buffer.forEach(function (element, i) {
    if (element === END_OF_LINE) currentLine++
    else lines[currentLine] = lines[currentLine] ? (lines[currentLine] + ' ' + element) : String(element)
  })
  return lines
}

/**
 * Find an element on a given file.
 * @param  {string} needle The element to look for.
 * @param  {string} file   The given file.
 * @return {object} An object where the key represent the line number
                    and where the value represent the array of column number.
 */
function findInFile (needle, file) {
  const lines = getFileLines(file)
  const results = Object.keys(lines).reduce(function (prev, lineNumber) {
    const line = bufferToString(lines[lineNumber])
    const columns = findInLine(needle, line)
    const result = columns.length ? {[lineNumber]: columns} : null
    return Object.assign({}, prev, result)
  }, {})
  return Object.keys(results).length ? results : null
}

module.exports = {
  includeMimeType: includeMimeType,
  getFileLines: getFileLines,
  findInFile: findInFile
}
