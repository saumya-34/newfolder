const fs = require('fs');
//const studentjson = require('');
module.exports = {
    getStudent : (req,res)=>{
        if(req.params['method']==='getDetails'){
            res.write(JSON.stringify(req.body));
            res.end();
        }
        if(req.params['method']==='studentList'){
            res.write(JSON.stringify(req.body));
            res.end();
        }
    },
    postStudent : (req,res)=>{
        if(req.params['method']==='add'){
            console.log(req.body);
            let data = req.body;
            fs.writeFile('./controller/student.txt',JSON.stringify(data),err=>{
                if(err) throw err;
                console.log("Done Writing");
            })
        res.send('{"result" : "success"}');
        }
    },
    putStudent : (req,res)=>{

    },
    deleteStudent : (req,res)=>{

    },
    patchStudent : (req,res)=>{

    }
}