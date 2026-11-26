import http from 'node:http';

http.createServer(async (request, response) => {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  if (request.url !== '/v1/chat/completions' || request.headers.authorization !== 'Bearer test-only-server-key') {
    response.writeHead(401).end();
    return;
  }
  const body = JSON.parse(raw);
  const { excerpts } = JSON.parse(body.messages[1].content);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ choices: [{ message: { content: JSON.stringify(excerpts.slice(0, 1).map(item => item.id)) } }] }));
}).listen(4318, '127.0.0.1');
