const fs = require('fs')
const include = require('./utils').include
const includeMimeType = require('./file').includeMimeType

/**
 * All elements that always ignored
 */
const ALWAYS_IGNORED = ['.git', 'node_modules']

/**
 * Check of an element is a directory.
 * @param  {string}  element The element to check.
 * @return {boolean} The result.
 */
function isADirectory (element) {
  return fs.statSync(element).isDirectory()
}

/**
 * Get all directory's files.
 * @param  {string} directory The current directory.
 * @return {array}  An array of file path.
 */
function getDirectoryFiles (directory, options) {
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
      if (deep) return prev.concat(getDirectoryFiles(path, options))
      return prev
    }
    return Array.from(prev).concat([path])
  }, [])
}

module.exports = {
  getDirectoryFiles: getDirectoryFiles,
  isADirectory: isADirectory
}
