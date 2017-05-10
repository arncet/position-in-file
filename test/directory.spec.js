const expect = require('chai').expect

const getDirectoryFiles = require('../src/directory').getDirectoryFiles
const isADirectory = require('../src/directory').isADirectory
const DEFAULT_OPTIONS = require('../src/utils').DEFAULT_OPTIONS

describe('directory : getDirectoryFiles', () => {
  it('default options', () => {
    expect(getDirectoryFiles('test/directoryTest', DEFAULT_OPTIONS)).to.be.eql([
      'test/directoryTest/directoryTest2/file1.js',
      'test/directoryTest/directoryTest2/file3.css',
      'test/directoryTest/file1.js',
      'test/directoryTest/file2.css',
      'test/directoryTest/file3.html'
    ])
  })

  it('custom options (no deep)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {deep: false})

    expect(getDirectoryFiles('test/directoryTest', options)).to.be.eql([
      'test/directoryTest/file1.js',
      'test/directoryTest/file2.css',
      'test/directoryTest/file3.html'
    ])
  })

  it('custom options (ignore test/directoryTest/file1.js)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['test/directoryTest/file1.js']})

    expect(getDirectoryFiles('test/directoryTest', options)).to.be.eql([
      'test/directoryTest/directoryTest2/file1.js',
      'test/directoryTest/directoryTest2/file3.css',
      'test/directoryTest/file2.css',
      'test/directoryTest/file3.html'
    ])
  })

  it('custom options (ignore JS file)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: [/.js$/]})

    expect(getDirectoryFiles('test/directoryTest', options)).to.be.eql([
      'test/directoryTest/directoryTest2/file3.css',
      'test/directoryTest/file2.css',
      'test/directoryTest/file3.html'
    ])
  })

  it('custom options (ignore CSS and JS files)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: [/.css$/, /.js$/]})

    expect(getDirectoryFiles('test/directoryTest', options)).to.be.eql(['test/directoryTest/file3.html'])
  })

  it('custom options (no fullPathRequired and ignore file1.js)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['file1.js'], fullPathRequired: false})

    expect(getDirectoryFiles('test/directoryTest', options)).to.be.eql([
      'test/directoryTest/directoryTest2/file3.css',
      'test/directoryTest/file2.css',
      'test/directoryTest/file3.html'
    ])
  })
})

describe('directory : isADirectory', () => {
  it('is a directory', () => {
    expect(isADirectory('test/directoryTest')).to.be.true
  })

  it('is not a directory', () => {
    expect(isADirectory('test/directoryTest/file1.js')).to.be.false
  })
})
