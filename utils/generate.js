const copy= require('copy-template-dir')
const path= require('path')
const {green: g, dim: d}= require('chalk')
const alert= require('clialerting')
const questions= require('./questions')
const debug= require('./debug')

module.exports= async (cli)=>{
    
    const vars= await questions()
    // console.log(vars) //receives Promise { <pending> }  //use in debug options
    const outDir= vars.name
    const inDirPath= path.join(__dirname, "./../template")
    const outDirPath= path.join(process.cwd(), outDir)  //_dirname can be there? or not

    outDir && copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
        if (err) throw err  //dipslay err and exit 
        console.log()
        console.log(d(`\nCreating files in ${g(`./${outDir}`)}`))

        createdFiles.forEach(filePath => {
            // console.log(`Created ${filePath}`)
            fileName= path.basename(filePath)
            console.log(`${g('CREATED')} ${fileName}`)
        })

        alert({type: 'success', msg: `\n\n${createdFiles.length} were created in ${d(`./${outDir}`)} directory`, name: 'All Done'})
        debug(cli.flags.debug, cli.flags, cli.input, vars)  //since this cb is executed at the last of process and we need that at end of process debug should be displayed
    })
    !outDir && console.log('You forgot to Enter the cli name which is most cumpolsary for this cli to work')

    // all {{keys in varobject}} in files in templates folder will be replaced by their values and will be copied tpo output directory
    // use underscores in file names of hidden files 
    return vars
}
