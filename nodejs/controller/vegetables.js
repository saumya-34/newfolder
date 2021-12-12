const fs = require('fs');
const http = require('http');
http.createServer((request,response)=>{
    if(request.method==='GET'){
    fs.readFile('vegetables.json','utf8',function(err,data){
        const jsondata = JSON.parse(data);
        console.log(typeof(jsondata));
        const jsonstring = JSON.stringify(jsondata);
        response.write(jsonstring);
        response.end();
    })
}
}).listen(8080);
