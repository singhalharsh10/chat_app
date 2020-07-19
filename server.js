const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')


const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('connected with socket id', socket.id)
        // data is the msg send from script.js
    socket.on('MsgSend', (data) => {
        // console.log('received', data.msg)
        // if we have done below socket.emit then it would hve passed msg to all users instead ye sirf usi html pagr pr ul add krta
        // io.emit will send msg to all including sender also
        // socket.broadcast.emit will send to all except sender
        socket.broadcast.emit('msg_rcvd', data)

    })
})






app.use(express.static(__dirname + '/public'))


server.listen(3000, () => {
    console.log('Server has started')
})