const http = require('http')
const url = require('url');
const server = http.createServer((request,response)=>{
    if(request.method==='GET'){
        const queryobj = url.parse(request.url,true).query;
        let params = new url.URLSearchParams(queryobj);
        if(params.has('name')&&params.has('year')){
            let dob_year = params.get('year');
            let months = params.get('months');
            let date = params.get('date');
            let name = params.get('name');
            let age = 2021-dob_year;
          response.writeHead(200,{"Content-Type":"text/plain"});
          response.write("Hello " + name);
          response.write("Your age is " + age);
          response.end();
          }
        }
        })
        server.listen(8080);
        