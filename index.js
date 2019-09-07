var express= require('express');
var app = express();
var Joi = require('@hapi/joi');

app.use(express.json());

var courses =[
{id :1,name :"Angular"},
{id :2,name :"Node js"},
{id :1,name:"Python"},
];

app.get("/api/courses/:id",(req,res)=>
{

    const course = courses.find(x=>x.id===parseInt(req.params.id));
    if(!course) res.status(404).send("Found No Records");
    res.send(course);

});
app.get('/',(req,res)=>{
res.send("Hello World !!");
});
app.get('/api/courses',(req,res)=>{
    res.send(["C#","Node Js","Angular"]);
    });

    app.get('/api/courses/:year/:month/:day',(req,res)=>{
        res.send(req.params );
        });
    

app.post('/api/courses',(req,res)=>
{
    const schema ={ name : Joi.string().min(3).required()   };
    const result =Joi.validate(req.body,schema);
        if (result.error)
        {
            res.status(400).send(result.error.details[0].message);
        }
        else
        {
            const course= {id :1,name :req.body.name };
            courses.push(course);
            res.send(course);
        }
});

 


        const port = process.env.PORT|| 3500;   
app.listen(port,()=>console.log(`Application is listening.......${port}`))