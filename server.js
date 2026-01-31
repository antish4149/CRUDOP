const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { stringify } = require('querystring');

app.use(express.json());

const filepath =path.join(__dirname,"./student.json");
app.get("/student",(req,res)=>{
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            console.log(err)
        }

        res.send(data);
        console.log("file readed");
    })

})

app.post("/student",(req,res)=>{
    
    const newStudnet= req.body;// data in jsobject form collecting using express.json() middleware
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
             return res.status(500).send("error reading file")
        }

        let student = data ? JSON.parse(data):[];
        student.push(newStudnet);

        fs.writeFile(filepath,JSON.stringify(student),(err)=>{
        if(err){
            return res.send("Error occured");
        }
        res.send("student added");
    })
    })
})


app.put("/student/:id",(req,res)=>{
    let id=req.params.id;
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
             return res.status(500).send("error reading file")
        }

        let students = data ? JSON.parse(data):[];
        const updatedStudents = students.map(student => {
            if (student.id == id) {
                return { 
                    ...student, ...req.body
                 };
            }
            return student;
        });


        fs.writeFile(filepath,JSON.stringify(updatedStudents),(err)=>{
        if(err){
            return res.send("Error occured");
        }
        res.send("student updated");
    })
    })
})

app.delete("/student/:id",(req,res)=>{
    let id=req.params.id;

    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
             return res.status(500).send("error reading file")
        }

        let students = data ? JSON.parse(data):[];
        const updatedStudents = students.filter(student=>student.id!=id);


        fs.writeFile(filepath,JSON.stringify(updatedStudents),(err)=>{
        if(err){
            return res.send("Error writing file");
        }
        res.send("student deleted");
    })
    })
})
app.listen(3000,()=>{
    console.log("server listening");
})