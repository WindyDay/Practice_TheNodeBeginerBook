const server = require("./server");
const router = require("./router");
const requestHandler = require("./requestHandler");

let handle = {};

handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;

server.start(router.route, handle);