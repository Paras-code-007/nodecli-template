const fs= require('fs')
const path= require('path')
const { Input }= require('enquirer')
const to= require('await-to-js').default
const {magenta}= require('chalk')
const {Store}= require('data-store')
const handleError= require('cli-display-error')

module.exports= async ({message, hint, initial, name})=>{

    let history =false

    if(!initial && name !== 'name' && name !== 'command' && name !== 'description'){
        history= {
            autosave: true,
            store: new Store({path: path.join(__dirname, `./../.history/${name}.json`)})  
        }
    }
    const [err,response]= await to(new Input({
        name,
        message,
        hint,
        initial,
        history,
        validate(value,state){ //which is the value enetered by user
            if(state && state.name === 'name'){
                if(fs.existsSync(value)){
                    return `Directory already exists: ./${value}`  //give error 
                }else{
                    return true  //validated and move fwd
                }
            }
            if(state && state.name === 'description') return true
            if(state && state.name === 'authorEmail') return true
            if(state && state.name === 'authorUrl') return true
            return !value? "Please add value" : true
        }
    })
    .on('cancel', ()=> {
        console.log(magenta.bold('❯ Cancelled'))
        process.exit(0)
    } ) //exit with error code 0
    .run())  //input function will create a run property inside the object made by new and when run is called it returns a promise which on resolve passes the arguement passed by the user or userinput
    handleError('Error: Invalid Entry',err)

    return response
}