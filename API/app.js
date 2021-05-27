const express= require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser());

database = [
    {id:1,name:'Chips',price:2,desription:'Pas bon pour la santé',url:''},
    {id:2,name:'Poireaux',price:2,desription:'Pas bon pour la santé',url:''},
    {id:3,name:'Tomates',price:2,desription:'Pas bon pour la santé',url:''},
    {id:4,name:'Pâtes',price:2,desription:'Pas bon pour la santé',url:''},
    {id:5,name:'Raisin',price:2,desription:'Pas bon pour la santé',url:''},
]


app.get('/api/product',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
    });    
    res.send(JSON.stringify(database))
})

app.options('/api/product/new',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"    
    });
    res.end()
})

app.options('/api/product/modify/:id',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"    
    });
    res.end()
})

app.options('/api/product/remove/:id',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"    
    });
    res.end()
})

app.post('/api/product/new',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
    });
    console.log(req.body)
    req.body['id'] = database.length
    database.push(req.body)
    console.log(database)
    res.end()
})

app.put('/api/product/modify/:id',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"   
    });
    console.log(req.params.id)
    console.log(req.body)
    database.forEach(product => {
        if(product.id ==req.params.id){
            product.description = req.body.description
            product.name = req.body.name
            product.price = req.body.price
            product.url = req.body.url
        }
    });
    console.log(database)
    res.end()
})

app.delete('/api/product/remove/:id',(req,res)=>{
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"   
    });
    target = 0;
    for(let i=0 ;i < database.length;i++){
        if(database[i].id == req.params.id) target = i
    }
    database.splice(target, 1);
    res.end()

})

app.listen(9000)