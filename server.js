import express from 'express'

const app = express()

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    return res.send("Hello world")
})

app.listen(PORT,(req,res)=>{
    console.log(`server is working on port ${PORT}`)
})