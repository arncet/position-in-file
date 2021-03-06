const fs = require('fs')
const include = require('./utils').include
const includeMimeType = require('./file').includeMimeType
const findInFile = require('./file').findInFile

/**
 * All elements that always ignored
 */
const ALWAYS_IGNORED = ['.git', 'node_modules', '.DS_Store']

/**
 * Check of an element is a directory.
 * @param  {string}  element The element to check.
 * @return {boolean} The result.
 */
function isADirectory (element) {
  return fs.statSync(element).isDirectory()
}

function findInDirectory (needle, directory, options) {
  const content = fs.readdirSync(directory)
  const deep = options.deep
  const ignore = options.ignore
  const fullPathRequired = options.fullPathRequired

  return content.reduce(function (prev, element) {
    const path = directory + '/' + element
    const ignored = fullPathRequired ? include(path, ignore) : include(element, ignore)
    const alwaysIgnored = include(element, ALWAYS_IGNORED)
    const mimeTypeIgnored = includeMimeType(element)
    if (ignored || alwaysIgnored || mimeTypeIgnored) return prev
    if (isADirectory(path)) {
      if (deep) return Array.from(prev).concat(findInDirectory(needle, path, options))
      return prev
    }
    const lines = findInFile(needle, path)
    if (Object.keys(lines).length) {
      const result = {file: path, lines: lines}
      return Array.from(prev).concat(result)
    }
    return prev
  }, [])
}

module.exports = {
  findInDirectory: findInDirectory,
  isADirectory: isADirectory
}
