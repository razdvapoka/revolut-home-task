require('babel-polyfill')
require('co-mocha')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiImmutable = require('chai-immutable')
const sinon = require('sinon')

chai.use(chaiAsPromised)
chai.use(chaiImmutable)

let sandbox = null

const initSandbox = () => {
  sandbox = sinon.sandbox.create()
}

const restore = () => sandbox.restore()

const stub = function () {
  return sandbox.stub(...arguments)
}

module.exports = {
  initSandbox,
  restore,
  stub
}
