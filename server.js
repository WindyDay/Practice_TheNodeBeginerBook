var http = require("http");
var url = require("url");

function start(route, handle){
    const PORT = process.env.PORT || 9000;

    function onRequest(request, response){
        let postData = "";
        var pathName = url.parse(request.url).pathname;
        console.log("Request for " + pathName + " recieved.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChuck){
            postData += postDataChuck;
            //console.log("Received POST data chuck ** " + postDataChuck + " **.");
        })


        request.addListener("end", function(){
            route(handle, pathName,response, postData);
        })


        // response.writeHead(200, {"Content-Type": "text/plain"});
        // response.write(content);
        // response.end();
    }
    
    http.createServer(onRequest).listen(PORT, () => {
        console.log("Server is running on port " + PORT + "!")
    });
}

exports.start = start;