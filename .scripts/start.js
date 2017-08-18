var config = require('config')

require('../server/dist/server').default(config.port)
