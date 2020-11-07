#! /usr/bin/env node

const copy= require('copy-template-dir')
const path= require('path')
const init= require('./utils/init')
const ask= require('./utils/ask.js')
const {green: g, dim: d}= require('chalk')
const alert= require('clialerting')

;(async ()=>{
    init()

    const name= await ask({message: 'CLI name? ', hint: 'Kebab-case-only'})
    const description= await ask({message: 'CLI description? '})
    const version= await ask({message: 'CLI version? ', hint: 'Use Semantic versioning',initial: '0.0.1'})
    const license= await ask({message: 'CLI license? ',initial: 'UNLICENSED'})
    const command= await ask({message: 'CLI command? ',hint: 'Optional: Add if differrent from the cli name'})
    const authorName= await ask({message: 'Author name? '})
    const authorEmail= await ask({message: 'Author email? '})
    const authorUrl= await ask({message: 'Author url? '})

    const vars= {
        name,
        description,
        version,
        license,
        command: command? command : name,
        authorName,
        authorEmail,
        authorUrl
    }
    const outDir= vars.name
    const inDirPath= path.join(__dirname, "template")
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
    })
    !outDir && console.log('You forgot to Enter the cli name which is most cumpolsary for this cli to work')

    // all {{keys in varobject}} in files in templates folder will be replaced by their values and will be copied tpo output directory
    // use underscores in file names of hidden files 
    
})()
