const ask= require('./ask')

;(async()=>{

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

module.exports= vars
//exports statemnt does not work in local scope 
})()