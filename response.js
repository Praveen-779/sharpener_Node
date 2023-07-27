const http = require('http');

const server = http.createServer((request, response) => {
    
    response.setHeader('Content-type', 'text/html');

    if (request.url === '/home') {
        response.write('<html><head><title>Home</title></head><body><h1>Welcome home</h1></body></html>');
    } else if (request.url === '/about') {
        response.write('<html><head><title>About Us</title></head><body><h1>Welcome to About Us page</h1></body></html>');
    } else if (request.url === '/node') {
        response.write('<html><head><title>Node JS Project</title></head><body><h1>Welcome to my Node Js project</h1></body></html>');
    } else {
        response.write('<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>');
    }

    response.end();
});

server.listen(3000);
