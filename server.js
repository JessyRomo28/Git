const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET' && req.url === '/api/items') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'GET request to /api/items' }));
    } else if (req.method === 'POST' && req.url === '/api/items') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'POST request to /api/items', data: body }));
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/api/items/')) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const id = req.url.split('/')[3];
            res.statusCode = 200;
            res.end(JSON.stringify({ message: `PUT request to /api/items/${id}`, data: body }));
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/items/')) {
        const id = req.url.split('/')[3];
        res.statusCode = 200;
        res.end(JSON.stringify({ message: `DELETE request to /api/items/${id}` }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
