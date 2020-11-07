#! /usr/bin/env node

/*
* {{name}}
* {{description}}
*/

const init = require('./utils/init')
const cli= require('./utils/cli')
const debug= require('./utils/debug')

;(async ()=>{
    
    init(cli.flags)
    // cli.input. and cli.flags.
    debug(cli.flags.debug, cli.flags, cli.input)

})()