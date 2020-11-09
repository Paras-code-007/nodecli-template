const copy= require('copy-template-dir')
const path= require('path')
const {green: g, dim: d, yellow: y}= require('chalk')
const alert= require('clialerting')
const questions= require('./questions')
const execa= require('execa')
const ora= require('ora')
const handleError= require('cli-display-error')
const to= require('await-to-js').default

const spinner= ora({text: ''})

module.exports= async ()=>{
    
    const vars= await questions()
    const outDir= vars.name
    const inDirPath= path.join(__dirname, "./../template")
    const outDirPath= path.join(process.cwd(), outDir)  //_dirname can be there? or not

    outDir && copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
        if (err) throw err  //dipslay err and exit 
        console.log()
        console.log(d(`\nCreating files in ${g(`./${outDir}`)}`))

        createdFiles.forEach(filePath => {
            fileName= path.basename(filePath)
            console.log(`${g('CREATED')} ${fileName}`)
        })

        alert({type: 'success', msg: `\n\n${createdFiles.length} files were created in ${d(`./${outDir}`)} directory`, name: 'All Done'})

        spinner.start(`${y('npm dedupe')} running...`)
        process.chdir(outDirPath)
        let [error,res]= await to(execa(`npm`, ['dedupe']))
        handleError('dedupe failed!!',error)
        spinner.succeed(`${g('npm dedupe')} ran succesfully\n`)
        
        spinner.start(`${y('npx conduct')} running...`)
        // try {
        //     await execa('npx', ['conduct'])
        // } catch (err) {
        //     alert({type: 'error', msg: 'npx conduct failed!!'})
        // }
        [error,res]= await to(execa('npx', ['conduct']))
        handleError('npx conduct failed!!',error)
        spinner.succeed(`${g('npx conduct')} ran succesfully: ${g('Added')} code-of-conduct.md\n`)
        
        spinner.start(`${y(`npx license ${vars.license}`)} running...`)
        [error,res]= await to(execa('npx', ['license',vars.license,'-n',vars.authorName.split(" ").join(""),'-e',vars.authorEmail]))
        handleError('npx license failed to ran!!',error)
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
        [error,res]=await to(execa('npm', ['install', ...packages, '--save']))
        handleError('dependencies failed to install!!',error)
        spinner.succeed(`${g('Dependencies')} installed!!`)

    })
    !outDir && console.log('You forgot to Enter the cli name which is most cumpolsary for this cli to work')
    return vars
}
