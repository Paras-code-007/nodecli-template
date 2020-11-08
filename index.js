#! /usr/bin/env node


const init= require('./utils/init')
const generate= require('./generate')

;(async ()=>{
    init()
    const vars= generate()
    console.log(vars)
        
})()
