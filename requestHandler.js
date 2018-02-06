let querystring = require("querystring");
let fs = require("fs");
let formidable = require("formidable");



let handleURL = {
    '/' : start,
    '/start' : start,
    '/upload' : upload,
    '/show': show,
};

// handleURL['/'] = start;
// handleURL['/start'] = start;
// handleURL['/upload'] = upload;


function start(response) {
    console.log("Request handler 'start' was called.");
    let body = '<html>' +
    '<head>' + 
    '<meta http-equiv = "Content-Type" content="text/html; charset =UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action = "/upload" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="upload"/>'+
    '<input type="submit" value="Upload file"/>'+
    '</form>'+
    '</body>'+
    '</html>'

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    let form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(err, fields, files){
        console.log('parsing done');

        //Possible error on windows systems:
        //=> tried to rename to an already existing file
        fs.rename(files.upload.path, "tmp/test.png", function(err){
            if(err){
                console.log(err);
                fs.unlink("tmp/test.png");
                fs.rename(files.upload.path, "tmp/test.png" );
            }
        })
    })
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Received image: <br/>");
    response.write("<img src='/show'/> ")
    response.end();
}

function show(response){
    console.log("Request handler 'show' was called.");

    fs.readFile('tmp/test.png', 'binary', function(err, file){
        if(err){
            response.writeHead(500, {"Content-Type": "text/plan"});
            response.write(err + '\n');
            response.end();
        }else{
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.handleURL = handleURL;

exports.start = start;
exports.upload = upload;
exports.show = show;

