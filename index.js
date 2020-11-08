#! /usr/bin/env node

const init= require('./utils/init')
const generate= require('./utils/generate')
const cli= require('./utils/cli')

;(async ()=>{
    init(cli.flags)
    cli.input.includes('help') && cli.showHelp()
    const vars=await generate(cli)  //returns a pending promis therfore awaited it 
    // const userinputs= {...vars}
})()
