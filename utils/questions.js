const ask= require('./ask')
const autocompPrompt= require('./autocomplete')
const alert= require('clialerting')

module.exports= async()=>{

    const name= await ask({name: 'name', message: 'CLI name? ', hint: 'Kebab-case-only'})
    if(!name){
        alert({type: 'error', msg: "Empty feild"})
        process.exit(0)
    }
    const command= await ask({name: 'command',message: 'CLI command? ',hint: 'Optional: Add if differrent from the cli name', initial: name})
    const description= await ask({name: 'description',message: 'CLI description? ', hint: '(Optional)'})
    const version= await ask({name: 'version',message: 'CLI version? ', hint: 'Use Semantic versioning',initial: '0.0.1'})
    // const license= await ask({name: 'license',message: 'CLI license? ',initial: 'UNLICENSED'})
    const license= await autocompPrompt({name: 'license',message: 'CLI license? ', hint: "Choose license plz"})
    const authorName= await ask({name: 'authorName',message: 'Author name? '})
    const authorEmail= await ask({name: 'authorEmail',message: 'Author email? ', hint: '(Optional)'})
    const authorUrl= await ask({name: 'authorUrl',message: 'Author url?', hint: '(Optional)'})
    //error handling not reqd here, cant find when error comes here after user enters the feild
    
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
    return vars;
}

// module.exports= vars
//exports statemnt does not work in local scope 