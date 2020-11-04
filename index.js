#! /usr/bin/env node

const copy= require('copy-template-dir')
const path= require('path')

const inDir= path.join(__dirname, "template")
const outDir= path.join(__dirname, "output")
const vars= {name: 'paras'}

copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err  //dipslay err and exit 
    createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
    console.log('done!')
})
// all {{keys in varobject}} in files in templates folder will be replaced by their values and will be copied tpo output directory
