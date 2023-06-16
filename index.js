const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

// Socket 
const io = require('socket.io')(http)

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


const users = {}

// The whole connection
io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("new-user-joined", name => {
        console.log("New user joined", name)
        users[socket.id] = name;

        socket.emit("user-joined", name);
    })

    socket.on("send", (message) => {
        // console.log(message)
        socket.broadcast.emit('receive', message)
    })
})