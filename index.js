#! /usr/bin/env node

const init= require('./utils/init')
const generate= require('./utils/generate')
const cli= require('./utils/cli')
const debug= require('./utils/debug')

;(async ()=>{

    init(cli.flags)
    cli.input.includes('help') && cli.showHelp()
    const vars=await generate()  //returns a pending promis therfore awaited it 
    const userinputs= {...vars}
    
    cli.flags.debug && process.on('exit',function (exitStatus) {
        console.log('exit code:', exitStatus)
        debug(cli.flags.debug, cli.flags, cli.input, userinputs)
    })

})()
