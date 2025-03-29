//Imports

const express = require('express');
const path = require('path');
const app = express();
const port = 80;
const http = require('http');
const fs = require('fs');
const bodyparser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);

//Initialize the app

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('static'));
app.use(express.urlencoded(extended=true));

app.use(cors({
    origin: "http://localhost", // Allow requests from this origin
    credentials: true
}));

const io = new Server(server, {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"],
      credentials: true
    }
});

//Endpoints

app.get("/", (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params)
});

//Port

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
