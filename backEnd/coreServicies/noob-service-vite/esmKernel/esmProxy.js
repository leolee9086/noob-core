import { cachePath } from './index.js'
const { createProxyMiddleware } = require('http-proxy-middleware')
const express =require("express")
const path =require("path")

export default function addEsmSurrport(app, port) {
    const proxy = createProxyMiddleware({
        target: `http://127.0.0.1:${port}/`,
        changeOrigin: true,
       pathRewrite: { '/noobDeps/': '/' },
    })
    app.use("/noobDeps/",(req,res,next)=>{
        console.log(req,res)
        let path = req.path 
        if(path=="fs"){
           (req,res)=> express.static(cachePath)(req,res)
        }
        else{
            next()
        }
    } ,(req,res)=>proxy(req,res))
}