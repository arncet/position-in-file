/**
 * Find column number of all file's occurances .
 * @param  {string} needle   The element to look for.
 * @param  {array}  haystack Where to look.
 * @return {array}  An array of column number.
 */
function findInLine (needle, haystack) {
  const regExp = new RegExp(needle, 'g')
  var match = null
  const matches = []
  while ((match = regExp.exec(haystack)) !== null) {
    matches.push(match.index + 1)
  }
  return matches
}

module.exports = {findInLine: findInLine}
