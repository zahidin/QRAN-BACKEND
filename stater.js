require('babel-register')({
    presets: ['env', 'babel-polyfill', 'stage-3' ]
})

module.exports = require('./app/index')