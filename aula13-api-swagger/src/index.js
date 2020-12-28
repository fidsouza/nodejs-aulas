const ContextStrategy = require('./db/strategies/base/ContextStratagy')
const MongoDB         = require('./db/strategies/Mongo')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()
