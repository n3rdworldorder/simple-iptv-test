const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const port = process.env.PORT || 3000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ipk': 'application/octet-stream'
};

function sendNotFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('404 Not Found');
}

function sendBadRequest(res, message) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message || 'Bad Request');
}

function handleProxyRequest(req, res) {
  let target;
  try {
    const fullUrl = new URL(req.url, `http://localhost:${port}`);
    target = fullUrl.searchParams.get('url');
  } catch (e) {
    return sendBadRequest(res, 'Invalid proxy request');
  }

  if (!target) {
    return sendBadRequest(res, 'Missing url parameter');
  }

  if (!/^https?:\/\//i.test(target)) {
    return sendBadRequest(res, 'Only http/https URLs are allowed');
  }

  const client = target.startsWith('https:') ? https : http;

  const upstream = client.get(target, (upRes) => {
    if (upRes.statusCode && upRes.statusCode >= 400) {
      res.statusCode = upRes.statusCode;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      upRes.resume();
      return res.end(`Upstream HTTP ${upRes.statusCode}`);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    upRes.pipe(res);
  });

  upstream.on('error', (err) => {
    console.error('Proxy error:', err.message || err);
    res.statusCode = 502;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Proxy error');
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/proxy?')) {
    return handleProxyRequest(req, res);
  }

  const urlPath = req.url.split('?')[0];
  let filePath = path.join(root, urlPath);

  if (urlPath === '/' || urlPath === '/index' || urlPath === '/index.html') {
    filePath = path.join(root, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return sendNotFound(res);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => sendNotFound(res));
    stream.pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Simple IPTV Test app running at http://localhost:${port}`);
});
