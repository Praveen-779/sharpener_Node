const http = require('http');

const server = http.createServer((request,response) => {
    console.log('Praveen');
})

server.listen(4000);