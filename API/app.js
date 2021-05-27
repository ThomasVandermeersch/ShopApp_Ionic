const express= require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser());

database = [
    {id:1,name:'Chips',price:2,description:'Pas bon pour la santé',url:'https://back.femininbio.com/attachments/2020/11/20/landscape/w1200/10341-chips-pommes-de-terre.jpg'},
    {id:2,name:'Poireaux',price:2,description:'Bon pour la santé',url:'https://d1e3z2jco40k3v.cloudfront.net/-/media/ducrosfr-2016/recipes/2000/poireaux_braises_au_laurier_2000.jpg?rev=522a61c0174648958daef556deb211b2&vd=20200704T131529Z&ir=1&width=885&height=498&crop=auto&quality=75&speed=2&hash=47B7B65CAECF099705960E236BDD7AAB'},
    {id:3,name:'Tomates',price:2,description:'Couleur :rouge',url:'https://img.cuisineaz.com/680x357/2018-04-14/i139355-tomates.jpeg'},
    {id:4,name:'Pâtes',price:2,description:'Spécialité italienne',url:''},
    {id:5,name:'Raisins secs',price:2,description:'Sans avis',url:'https://media.cdnws.com/_i/48378/5329/1150/32/raisins-sultana-secs-naturels-detail-zoom.jpeg'},
]

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods" : "*",
    "Access-Control-Allow-Headers" : "*"    
}

app.get('/api/product',(req,res)=>{
    res.set(headers);    
    res.send(JSON.stringify(database))
})

app.options('*',(req,res)=>{
    res.set(headers);
    res.end()
})

app.post('/api/product/new',(req,res)=>{
    res.set(headers);
    req.body['id'] = database.length
    database.push(req.body)
    res.end()
})

app.put('/api/product/modify/:id',(req,res)=>{
    res.set(headers);
    database.forEach(product => {
        if(product.id ==req.params.id){
            product.description = req.body.description
            product.name = req.body.name
            product.price = req.body.price
            product.url = req.body.url
        }
    });
    res.end()
})

app.delete('/api/product/remove/:id',(req,res)=>{
    res.set(headers);
    target = 0;
    for(let i=0 ;i < database.length;i++){
        if(database[i].id == req.params.id) target = i
    }
    database.splice(target, 1);
    res.end()

})

app.listen(9000)