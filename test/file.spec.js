const expect = require('chai').expect

const includeMimeType = require('../src/file').includeMimeType
const getFileLines = require('../src/file').getFileLines
const findInFile = require('../src/file').findInFile

describe('file : includeMimeType', () => {
  it('MIME_TYPES_IGNORED contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file2.png')).to.be.true
  })

  it('MIME_TYPES_IGNORED not contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file1.js')).to.be.false
  })
})

describe('file : getFileLines', () => {
  it('will return this file\'s lines (octet)', () => {
    const lines = getFileLines('test/directoryTest/file1.js')

    expect(lines).to.be.an('object')

    expect(lines).to.have.property('1')
    expect(lines[1]).to.be.eql('118 97 114 32 102 111 111 32 61 32 39 98 97 114 39')

    expect(lines).to.have.property('2')
    expect(lines[2]).to.be.eql('118 97 114 32 98 97 114 32 61 32 39 102 111 111 39')

    expect(lines).to.have.property('3')
    expect(lines[3]).to.be.eql('118 97 114 32 102 111 111 98 97 114 32 61 32 39 98 97 114 102 111 111 39')
  })
})

describe('file : findInFile', () => {
  it('will some results (string)', () => {
    const results = findInFile('foo', 'test/directoryTest/file1.js')
    expect(results).to.be.eql({
      1: [5],
      2: [12],
      3: [5, 18]
    })
  })

  it('will some results (regExp)', () => {
    const results = findInFile(/foo/, 'test/directoryTest/file1.js')
    expect(results).to.be.eql({
      1: [5],
      2: [12],
      3: [5, 18]
    })
  })

  it('will nothing (string)', () => {
    const results = findInFile('nothing', 'test/directoryTest/file1.js')
    expect(results).to.be.null
  })

  it('will nothing (regExp)', () => {
    const results = findInFile(/nothing/, 'test/directoryTest/file1.js')
    expect(results).to.be.null
  })
})
