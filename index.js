#! /usr/bin/env node

const copy= require('copy-template-dir')
const path= require('path')
const init= require('./utils/init')
const ask= require('./utils/ask.js')

;(async ()=>{
    init()
    
    const name= await ask({message: 'CLI name? ', hint: 'Use-kebab-case'})
    const description= await ask({message: 'CLI description? '})
    
    const vars= {
        name,
        description,
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
