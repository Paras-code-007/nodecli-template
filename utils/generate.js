const copy= require('copy-template-dir')
const path= require('path')
const {green: g, dim: d, yellow: y}= require('chalk')
const alert= require('clialerting')
const questions= require('./questions')
const execa= require('execa')
const ora= require('ora')

const spinner= ora({text: ''})

module.exports= async ()=>{
    
    const vars= await questions()
    // console.log(vars) //receives Promise { <pending> }  //use in debug options
    const outDir= vars.name
    const inDirPath= path.join(__dirname, "./../template")
    const outDirPath= path.join(process.cwd(), outDir)  //_dirname can be there? or not
    // console.log(outDirPath)

    outDir && copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
        if (err) throw err  //dipslay err and exit 
        console.log()
        console.log(d(`\nCreating files in ${g(`./${outDir}`)}`))

        createdFiles.forEach(filePath => {
            // console.log(`Created ${filePath}`)
            fileName= path.basename(filePath)
            console.log(`${g('CREATED')} ${fileName}`)
        })

        alert({type: 'success', msg: `\n\n${createdFiles.length} files were created in ${d(`./${outDir}`)} directory`, name: 'All Done'})

        spinner.start(`${y('npm dedupe')} running...`)
        process.chdir(outDirPath)
        await execa(`npm`, ['dedupe'])
        spinner.succeed(`${g('npm dedupe')} ran succesfully\n`)
        spinner.start(`${y('npx conduct')} running...`)
        await execa('npx', ['conduct'])
        spinner.succeed(`${g('npx conduct')} ran succesfully: ${g('Added')} code-of-conduct.md\n`)
        
        spinner.start(`${y(`npx license ${vars.license}`)} running...`)
        await execa('npx', ['license',vars.license,'-n',vars.authorName.split(" ").join(""),'-e',vars.authorEmail])
        // process.chdir(path.join(process.cwd(), '../'))
        spinner.succeed(`${g(`npx license ${vars.license}`)} ran succesfully: ${g('Added')} LICENSE\n`)

        const packages= [
            'meow',
            'chalk',
            'clialerting',
            'cli-welcome',
            'node-vercheck',
            'unhandle-error'
        ]
        spinner.start(`${y('Dependencies')} installing...\n\n ${d('It may take a moment')}`)
        await execa('npm', ['install', ...packages, '--save'])
        spinner.succeed(`${g('Dependencies')} installed!!`)
    })
    !outDir && console.log('You forgot to Enter the cli name which is most cumpolsary for this cli to work')

    // all {{keys in varobject}} in files in templates folder will be replaced by their values and will be copied tpo output directory
    // use underscores in file names of hidden files 
    return vars
}
