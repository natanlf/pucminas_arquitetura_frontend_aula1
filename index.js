const http = require("http");
const url = require('url');

const host = 'localhost';
const port = 8000;

const requestHtml = function (page) {
    return "<html><body>conteudo</body></html>";
}

const requestListener = function (req, res) {
    const parsedUrl = url.parse(req.url, true); 
    const path = parsedUrl.pathname;
    console.log(path);
    res.writeHead(200);
    res.end(requestHtml("page1"));
};

//cria o servidor
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});