let http = require("http");
let url = require("url");
let route = require("./router").route;


function start(){
    const PORT = process.env.PORT || 9000;

    function onRequest(request, response){
        
        let pathName = url.parse(request.url).pathname;
        console.log("Request for " + pathName + " recieved.");

        route(pathName,response, request);
    }
    
    http.createServer(onRequest).listen(PORT, () => {
        console.log("Server is running on port " + PORT + "!")
    });
}

exports.start = start;