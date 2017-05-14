const expect = require('chai').expect

const includeMimeType = require('../src/file').includeMimeType
const findInFile = require('../src/file').findInFile

describe('file : includeMimeType', () => {
  it('MIME_TYPES_IGNORED contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file2.png')).to.be.true
  })

  it('MIME_TYPES_IGNORED not contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file1.js')).to.be.false
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
    expect(results).to.be.eql({})
  })

  it('will nothing (regExp)', () => {
    const results = findInFile(/nothing/, 'test/directoryTest/file1.js')
    expect(results).to.be.eql({})
  })
})
