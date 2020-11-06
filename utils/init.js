const welcome= require('cli-welcome')
const pkgJSON= require('./../package.json')
const checkVersion= require('node-vercheck')
const unhandled= require('unhandle-error')

module.exports= ()=>{
    process.on('SIGINT',function () {
        console.log("Sad!! You closed the process in between.....!!")
        console.log("Any Problem/query? Give feedback at https://www.domainname.tld")
    })
    
    unhandled()

    checkVersion(10,{
        exit: true
    })
    welcome({
        title: "Create-nodejs-cli",
        tagLine: `run \`npx clistart\` to create a cli template in the same current folder\nBy Paras Arora`,
        bgColor: `#708090`,
        color: `#000000`,
        bold: true,
        clear: true,
        version: `${pkgJSON.version}`,
        description: pkgJSON.description
    })

}