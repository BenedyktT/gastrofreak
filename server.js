import express from 'express'

const app = express()

const PORT = process.env.PORT || 5000

app.use
app.get("/",(req,res)=>{
    return res.send("Hello world")
})

app.listen(PORT,(req,res)=>{
    console.log(`server is working on port ${PORT}`)
})

//https://developer.edamam.com/admin/applications/1409619312049
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata