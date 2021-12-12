const http = require('http');
const url = require('url');
http.createServer((request,response)=>{
    if(request.method==='GET'){
        const queryobj = url.parse(request.url,true).query;
        const params = new url.URLSearchParams(queryobj);
        if(params.has('object')){
            let radius = params.get('radius');
            if(params.get('object')==='circle'){
                let area = 3.14*radius*radius;
                response.writeHead(200,{'Content-Type':'text/plain'})
                response.write("Area of the circle is " + area);
                response.end();
            }
            else{
                let volume = 1.34*3.14*radius*radius*radius;
                response.writeHead(200,{'Content-Type':'text/plain'})
                response.write("Volume of the sphere is " + volume);
                response.end();
            }
        }
    }
}).listen(8080);