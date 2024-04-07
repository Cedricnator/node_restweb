import http from 'http';
import fs from 'fs';

const server = http.createServer(( req, res ) => {
    console.log(req.url);

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hola mundo</h1>');
    // res.end();

    // const data = { name: 'John doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end( JSON.stringify(data) );

    switch( req.url ){
        case '/':
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.end(htmlFile);
        break;

        case '/css/styles.css':
            const styleFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
            res.writeHead(200, {
                'Content-type': 'text/css'
            });
            res.end(styleFile);
        break;

        case '/js/app.js':
            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            })
            res.end(jsFile);
        break;

        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
    }

});

server.listen(8080, () => {
    console.log('Server running on port 8080')
})

