const welcome= require('cli-welcome')
const checkNode= require('node-vercheck')
const unhandled= require('unhandle-error')
const pkgJSON= require('./../package.json')

module.exports= (flags)=>{
    process.on('SIGINT',function () {
        console.log("Sad!! You closed the process in between.....!!")
        console.log("Any Problem/query? Give feedback at https://www.domainname.tld")
    })
    
    unhandled()

    let clear= flags.clear
    
    !flags.minimal && welcome({
        title: "paras007",
        tagLine: "run `npx paras007` to get know about me",
        bgColor: `#708090`,
        color: `#000000`,
        bold: true,
        clear,
        version: `${pkgJSON.version}`,
        description: pkgJSON.description
    })

    checkNode('10')
   
}