var http = require("http");
var url = require("url");

function start(route, handle){
    const PORT = process.env.PORT || 9000;

    function onRequest(request, response){
        
        var pathName = url.parse(request.url).pathname;
        console.log("Request for " + pathName + " recieved.");

        route(handle, pathName,response, request);
    }
    
    http.createServer(onRequest).listen(PORT, () => {
        console.log("Server is running on port " + PORT + "!")
    });
}

exports.start = start;