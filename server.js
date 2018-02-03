var http = require("http");
var url = require("url");

function start(route, handle){
    const PORT = process.env.PORT || 9000;

    function onRequest(request, response){
        console.log("Request received.")
        var pathName = url.parse(request.url).pathname;
        console.log("path name: " + pathName);

        route(handle, pathName, response);


        // response.writeHead(200, {"Content-Type": "text/plain"});
        // response.write(content);
        // response.end();
    }
    
    http.createServer(onRequest).listen(PORT, () => {
        console.log("Server is running on port " + PORT + "!")
    });
}

exports.start = start;