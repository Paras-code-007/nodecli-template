const { AutoComplete } = require('enquirer');
const to= require('await-to-js').default
const handleError= require('cli-display-error')
const choices= require('./licensedata')
const {magenta}= require('chalk')
const {Store}= require('data-store')
const path= require('path')

module.exports= async ({name, message, hint})=>{
    const [err,response]= await to(new AutoComplete({
        name,
        message,
        limit: 5,
        choices,
        hint
    })
    .on('cancel', ()=> {
        console.log(magenta.bold('❯ Cancelled'))
        process.exit(0)
    })
    .run())
    handleError('Error: Invalid Choice!!',err)

    return response
}

