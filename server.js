var http = require("http");

const PORT = process.env.PORT || 9000;

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello word");
    response.end();
}).listen(PORT, () => {
    console.log("Server is running on port " + PORT + "!")
});