const express = require('express')
const app = express()
const {db, Show} = require('./db')
const { faker } = require('@faker-js/faker')
const path = require('path')

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')))

app.post('/api/shows', async(req, res, next)=>{
    try{
        await randomShow()
        res.send(await Show.findAll())
    }catch(err){
        next(err)
    }
})

app.delete('/api/shows/:id', async(req, res, next)=>{
    try{
        const show = await Show.findByPk(req.params.id)
        await show.destroy()
        res.send(await Show.findAll())
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

const possiblePlatforms = ['netflix', 'disney plus', 'prime video']

const randomShow = ()=>{
    return Show.create({name:faker.random.words(Math.floor(Math.random()+3)), platform:possiblePlatforms[Math.floor(Math.random()*3)]})
}

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