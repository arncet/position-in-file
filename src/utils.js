const fs = require('fs')

/**
 * Default options.
 * @key {boolean} deep             If the research will be apply on deep folder.
 * @key {array}   ignore           An array to define the file/filter to ignore.
 * @key {boolean} fullPathRequired If full path need to be specified on option.ignore array.
 * @key {boolean} gitIgnore        If .gitIgnore's file/folder need to be ignored.
 */
const DEFAULT_OPTIONS = {
  deep: true,
  ignore: [],
  fullPathRequired: true,
  gitIgnore: true
}

/**
 * Find if an element is contained on a some container.
 * @params {string}  element The element to look for.
 * @params {array}   array   Where to look.
 * @return {boolean} If array contain element.
 */
function include (element, array) {
  return !!array.find(function (el) {
    if (el instanceof RegExp) return element.match(el)
    return el === element
  })
}

/**
 * Get the content of .gitignore.
 * @return {array} An array of .gitignore's lines.
 */
function getGitIgnoreContent () {
  return fs.readFileSync('.gitignore', {encoding: 'utf-8'}).split('\n')
}

/**
 * Parse options, merge given option with defaults options.
 * @param  {oject} options Given options.
 * @return {obect} Options parsed.
 */
function parseOptions (options) {
  if (!options || !Object.keys(options).length) return DEFAULT_OPTIONS
  options.ignore = options.gitIgnore ? Array.from(options.ignore).concat(getGitIgnoreContent()) : options.ignore
  return Object.assign({}, DEFAULT_OPTIONS, options)
}

/**
 * Add global flag to the given string/regExp.
 * @param  {string} regExp Given string/regExp.
 * @return {obect}  String/RegExp parsed.
 */
function parseRegExp (regExp) {
  if (regExp.global) return regExp
  const source = regExp instanceof RegExp ? regExp.source : regExp
  var flags = 'g'
  if (regExp.ignoreCase) flags += 'i'
  if (regExp.multiline) flags += 'm'
  if (regExp.unicode) flags += 'u'
  if (regExp.sticky) flags += 'y'
  return new RegExp(source, flags)
}

module.exports = {
  DEFAULT_OPTIONS: DEFAULT_OPTIONS,
  include: include,
  getGitIgnoreContent: getGitIgnoreContent,
  parseOptions: parseOptions,
  parseRegExp: parseRegExp
}
