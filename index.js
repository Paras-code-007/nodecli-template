#! /usr/bin/env node

const copy= require('copy-template-dir')
const path= require('path')
const init= require('./utils/init')
const { Input }= require('enquirer')
const to= require('await-to-js').default
const handleError= require('cli-display-error')

;(async ()=>{
    init()

    const [err,name]= await to(new Input({
        message: 'Enter name of the cli: ',
        hint: 'Use kebab case'
    }).run())  //input function will create a run property inside the object made by new and when run is called it returns a promise which on resolve passes the arguement passed by the user or userinput
    handleError('INPUT',err);
    
    const vars= {
        name,
        description: 'CLI to resize and optimise images',
    }
    
    const inDir= path.join(__dirname, "template")
    const outDir= path.join(__dirname, vars.name)
    
    copy(inDir, outDir, vars, (err, createdFiles) => {
        if (err) throw err  //dipslay err and exit 
        console.log()
        console.log(`Creating files in ./${vars.name}`)
        createdFiles.forEach(filePath => {
            // console.log(`Created ${filePath}`)
            fileName= path.basename(filePath)
            console.log(`Created ${fileName}`)
        })
        console.log('done!')
        console.log()
    })
    // all {{keys in varobject}} in files in templates folder will be replaced by their values and will be copied tpo output directory
    // use underscores in file names of hidden files 
    
})()
