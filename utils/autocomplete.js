const { AutoComplete } = require('enquirer');
const to= require('await-to-js').default
const handleError= require('cli-display-error')
const choices= require('./licensedata')

module.exports= async ({name, message})=>{
    const [err,response]= await to(new AutoComplete({
        name,
        message,
        limit: 5,
        choices
    })
    .run())

    return response
}

// .on('cancel', ()=> {
//     console.log(magenta.bold('❯ Cancelled'))
//     process.exit(0)
// })