var express= require('express');
var app = express();
var Joi = require('@hapi/joi');

app.use(express.json());

var courses =[
{id :1,name :"Angular"},
{id :2,name :"Node js"},
{id :3,name:"Python"},
];

//Getting the data for given Id

app.get("/api/courses/:id",(req,res)=>
{

    const course = courses.find(x=>x.id===parseInt(req.params.id));
    if(!course) res.status(404).send("Found No Records");
    res.send(course);

});
//Getting the data
app.get('api1/courses',(req,res)=>{res.send(courses)});

app.get('/',(req,res)=>{
res.send(courses);
});
app.get('/api/courses',(req,res)=>{
    res.send(["C#","Node Js","Angular"]);
    });

    app.get('/api/courses/:year/:month/:day',(req,res)=>{
        res.send(req.params );
        });
    

// Inserting Data

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

//Updating Data

app.put('/:id',(req,res)=>
{
    //Checking Courses Id is Valid
    var course = courses.find(x=>x.id == req.params.id)
    if(!course){
        res.status(404).send("Invalid Id");
        return;       
    } 
    // Validating Provided Data is Correct
    var schema ={name : Joi.string().min(3).required()}
    var {error}= Joi.validate(req.body,schema);
    if(error)
    {
    res.status(400).send(error.details[0].message);
    return;
    }
      //Sucessful
    course.name= req.body.name;
    res.send(course);
});

//Deleting

app.delete("/:id",(req,res)=>
{

    var course = courses.find(x=>x.id == req.params.id)
    if(!course){
        res.status(404).send("Invalid Id");
        return;       
    } 

    var index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
        const port = process.env.PORT|| 3500;   
app.listen(port,()=>console.log(`Application is listening.......${port}`))