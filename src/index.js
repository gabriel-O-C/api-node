const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'html/text' });
  response.end('<h1>Olá mundo</h1>');
});

server.listen(3000, () => console.log('server is up and running at http://localhost:3000'));
