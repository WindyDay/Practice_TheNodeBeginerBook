var http = require("http");

function start(){
    const PORT = process.env.PORT || 9000;

    function onRequest(request, response){
        console.log("Request received.")
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello word");
        response.end();
    }
    
    http.createServer(onRequest).listen(PORT, () => {
        console.log("Server is running on port " + PORT + "!")
    });
}

exports.start = start;