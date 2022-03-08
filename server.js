const express = require('express')
const app = express()
const {db, Show} = require('./db')

app.use(express.json())

app.post('/api/shows', async(req, res, next)=>{
    try{
        await Show.create(req.body)
        res.sendStatus(201)
    }catch(err){
        next(err)
    }
})

app.get('/api/shows', async(req, res, next)=>{
    try{
        res.send(await Show.findAll())
    }catch(err){
        next(err)
    }
})

// const randomName = faker.random.words(faker.random.number(3))
// console.log(randomName)

// const randomShow = ()=>{
//     return Show.create({})
// }

const setUp = async()=>{
    try{
        await db.sync({force:true})
        await Show.create({name:'squid games', platform:'netflix'})
        await Show.create({name:'vikings:valhalla', platform:'netflix'})
        await Show.create({name:'invincible', platform:'prime video'})
        await Show.create({name:'blue mountain state', platform:'prime video'})
        await Show.create({name:'brain games', platform:'disney plus'})
        await Show.create({name:'the mandalorian', platform:'disney plus'})
        const port = process.env.PORT || 3000
        app.listen(port, ()=>{console.log(`listening on port ${port}`)})
    }catch(ex){
        console.log('There was an error setting up the DB')
    }
}

setUp()