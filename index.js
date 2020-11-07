#! /usr/bin/env node

const copy= require('copy-template-dir')
const path= require('path')
const init= require('./utils/init')
const ask= require('./utils/ask.js')

;(async ()=>{
    init()

    const name= ask({message: 'CLI name? ', hint: 'Kebab-case-only'})
    const description= ask({message: 'CLI description? '})
    const version= ask({message: 'CLI version? ', hint: 'Use Semantic versioning',initial: '0.0.1'})
    const license= ask({message: 'CLI license? ',initial: 'UNLICENSED'})
    const authorName= ask({message: 'Author name? '})
    const authorEmail= ask({message: 'Author email? '})
    const authorUrl= ask({message: 'Author url? '})

    const vars= {
        name,
        description,
        version,
        authorName,
        authorEmail,
        authorUrl,
        license
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
