const http = require('http');
const { URL } = require('url');
const routes = require('./routes');


const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`)

  let { pathname } = parsedUrl;
  let id = null;
  const splitEndPoint = pathname.split('/').filter(Boolean);
  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }
  console.log(splitEndPoint)

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));
  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'text-html' });
      response.end(JSON.stringify(body));
    };
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  };
});
server.listen(3000, () => console.log('server is up and running at http://localhost:3000'));