const fs = require('fs')
const extName = require('ext-name')
const include = require('./utils').include
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

function findInFile (needle, file) {
  const END_OF_LINE = 10
  const bufferString = fs.readFileSync(file).toJSON().data
  const allEOFIndex = bufferString.reduce(function (prev, element, i) {
    return element === END_OF_LINE ? Array.from(prev).concat(i) : prev
  }, [])
  return allEOFIndex.reduce(function (prev, EOFIndex, i, EOFIndexes) {
    const lastEOFIndex = i === 0 ? 0 : (EOFIndexes[i - 1] + 1)
    const line = bufferString.slice(lastEOFIndex, EOFIndex)
    const columns = findInLine(needle, Buffer.from(line).toString())
    const lineNumber = i + 1
    const result = columns.length ? {[lineNumber]: columns} : null
    return Object.assign({}, prev, result)
  }, {})
}

module.exports = {
  includeMimeType: includeMimeType,
  findInFile: findInFile
}
