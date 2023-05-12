const http = require("http");
const url = require('url');
const crypto = require('crypto');

const host = 'localhost';
const port = 8000;

const requestHtml = function (page) {
    if(page === "/page1") {
        return "<html><body>Page 1 v2</body></html>";
    } 
    return "<html><body>Page 2</body></html>";
    
    //return `<html><body>Page ${page}</body></html>`;
}

function generateHash(pageHtml) {
    return crypto.createHash('md5').update(pageHtml).digest('hex');
}

function requestListener (req, res) {
    const parsedUrl = url.parse(req.url, true); 
    const path = parsedUrl.pathname;
    console.log(path);
 
    const pageHtml = requestHtml(path);
    let hashPage = generateHash(pageHtml)
    if(hashPage === req.headers["if-none-match"]) {
        res.writeHead(304);
        res.end();
    }

    //res.writeHead(200, {"cache-control": "no-store"})
    //res.writeHead(200, {"cache-control": "max-age=0"})
    res.writeHead(200, {
        "cache-control": "max-age=0, must-revalidate",
        "etag": hashPage
    })
   
    res.end(pageHtml);
};

//cria o servidor
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});