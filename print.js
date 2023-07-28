const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.error('Error reading message.txt:', err);
                data = '';
            }

            res.setHeader('Content-Type', 'text/html');
            res.write('<html><head><title>Enter Message</title></head><body>');
            res.write(`<p>${data}</p>`);
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message">');
            res.write('<button type="submit">Send</button>');
            res.write('</form>');
            res.write('</body></html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error('Error writing to message.txt:', err);
                }

                // After saving the message, redirect to the root URL to display the updated message
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Page Not Found</title></head><body>');
        res.write('<h1>404 Page Not Found</h1>');
        res.write('</body></html>');
        res.end();
    }
});

server.listen(3000);
