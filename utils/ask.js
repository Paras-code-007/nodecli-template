const { Input }= require('enquirer')
const to= require('await-to-js').default
const handleError= require('cli-display-error')

module.exports= async ({message, hint, initial})=>{
    
    // console.log(message)
    // console.log(hint)
    // console.log(initial)
    const [err,name]= await to(new Input({
        message,
        hint,
        initial
    }).run())  //input function will create a run property inside the object made by new and when run is called it returns a promise which on resolve passes the arguement passed by the user or userinput
    
    // console.log(name)
    // handleError('INPUT',err);

    return name
}











// (async ()=>{

// const [err,name]= await to(new Input({
//     message: 'helloworld',
//     hint: 'hint'
// }).run())  //input function will create a run property inside the object made by new and when run is called it returns a promise which on resolve passes the arguement passed by the user or userinput

// console.log(name)
// })()