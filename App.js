// Server-Side
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('main.html');

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({
    path: 'COM8',
    baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));


var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

const io = require('socket.io')(app)

parser.on('data', function(data) {
    console.log(data);
    io.emit("data", data);
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
