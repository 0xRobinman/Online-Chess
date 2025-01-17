const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const {handleConnection} = require('./io/socket.js');

const helmet = require('helmet');
const dotenv = require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const server = createServer(app);

app.use(helmet());
app.use(cors());


const io = new Server(server, {
    cors: {
        origin:  process.env.FRONT_END || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on("connect", (socket) => {
    handleConnection(io, socket);
});

server.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server is running at port ${process.env.SERVER_PORT | 3000}`);
});