const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')

chai.use(chaiAsPromised)

let sandbox = null

const initSandbox = () => {
  sandbox = sinon.sandbox.create()
}

const restore = () => sandbox.restore()

const stub = function () {
  return sandbox.stub(...arguments)
}

global.stub = stub
global.restore = restore
global.initSandbox = initSandbox
global.expect = chai.expect
