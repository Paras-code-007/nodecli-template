#! /usr/bin/env node

const init= require('./utils/init')
const generate= require('./utils/generate')
const cli= require('./utils/cli')
const debug= require('./utils/debug')

;(async ()=>{
    init(cli.flags)
    cli.input.includes('help') && cli.showHelp()
    const vars=await generate()  //returns a pending promis therfore awaited it 
    // console.log(vars) //executed before the callback of copy function because cb of copy function executed after the asynchtonous copy fn was completed making the directories
    // and when it as making the directories rest of the script generate.js completed and index.js completed and as soon as it finished making directory it pushes the cb function in the event loop
    const userinputs= {...vars}
    debug(cli.flags.debug, cli.flags, cli.input, userinputs)
})()
