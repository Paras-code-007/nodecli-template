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

//fixed the non occurence of _.gitignore and _todos.md files when package was installed and run using npx 
// in normal local linking and running of package this error not come but the error came when installed via npx
// to fix this error make sure that filenames having underscores are within the same directory and within one directory only 
// to fix remove underscores before filenames in utils directory and add that underscore in the root directory