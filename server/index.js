const express = require('express'); 
const app = express(); 
const http = require('http'); 
const { Server } = require('socket.io');
const server = http.createServer(app); 
const io = new Server(server); 

var PORT = 5000 | process.env.PORT; 

app.get('/', (req, res) => {
    res.send("Hello World"); 
});

io.on('connection', (socket) => {
    console.log("User has conected"); 
}); 

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
}); 
