// dom-storage
let Storage = require('dom-storage');
let localStorage = new Storage('./db.json', { strict: false, ws: '  ' });

// express
let path = require('path');
let express=require('express');
let app=express();

// body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

// method-override
let methodOverride = require('method-override');
app.use(methodOverride('_method'));

// front-end
let dir = path.join(__dirname, 'public');
app.use(express.static(dir));

// cat object
let Cat=require('./cat.js');

// stored list
let list = [];
let currentId=0;
if (localStorage.getItem('list')){
    list=localStorage.getItem('list');
}
if (localStorage.getItem('currentId')){
    currentId=localStorage.getItem('currentId');
}

// urls
app.get('/', function(req,res){
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(200);
    res.end();
});
app.get('/list', function(req,res){
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(200);
    res.json(list);
    res.end();
});
app.post('/add', function(req,res){
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(302);
    list.push(new Cat(currentId,req.body.name,req.body.breed,req.body.size,req.body.weight,req.body.age,new Date(),req.body.location,req.body.image,req.body.comment,"No"));
    currentId++;
    localStorage.setItem('currentId',currentId);
    localStorage.setItem('list',list);
    res.redirect('/');
    res.end();
});
app.put('/edit', function(req,res){
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(302);
    let currentInt=req.body.int;
    req.body.name?list[currentInt].name=req.body.name:'';
    req.body.breed?list[currentInt].breed=req.body.breed:'';
    req.body.size?list[currentInt].size=req.body.size:'';
    req.body.weight?list[currentInt].weight=req.body.weight:'';
    req.body.age?list[currentInt].age=req.body.age:'';
    req.body.location?list[currentInt].location=req.body.location:'';
    req.body.image?list[currentInt].image=req.body.image:'';
    req.body.comment?list[currentInt].comment=req.body.comment:'';
    req.body.found?list[currentInt].found=req.body.found:'';
    list[currentInt].date=new Date();
    localStorage.setItem('list',list);
    res.redirect('/');
    res.end();
});
app.delete('/delete', function(req,res){
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(302);
    let deleteId=req.body.id;
    list.splice(deleteId,1);
    localStorage.setItem('list',list);
    res.redirect('/');
    res.end();
});
app.use((req,res,next)=>{
    res.setHeader('Content-type','application/json ; charset=utf-8');
    res.status(404).send('404 Not Found');
    res.end();
});

app.listen(9090);