const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')
const { Socket } = require('net')


const server = http.createServer(app)
const io = socketio(server)

let users = {
    swati: 'va34'
}

let socketMap = {}

io.on('connection', (socket) => {
    console.log('connected with socket id', socket.id)

    function login(s, u) { //s=socket,u=username
        s.join(u)
        s.emit('logged_in')
        socketMap[s.id] = u
        console.log(socketMap)
    }

    // code for learning
    // data is the msg send from script.js
    // socket.on('MsgSend', (data) => {
    //     // console.log('received', data.msg)
    //     // if we have done below socket.emit then it would hve passed msg to all users instead ye sirf usi html pagr pr ul add krta
    //     // io.emit will send msg to all including sender also
    //     // socket.broadcast.emit will send to all except sender
    //     socket.broadcast.emit('msg_rcvd', data)




    // })
    // final code
    socket.on('login', (data) => {
        // checking if username already exist in our users array
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login-failed')
            }
        } else {
            // new user
            users[data.username] = data.password
            login(socket, data.username)


        }
        console.log(users)
    })

    // Below we are using the logic that if msg_received from client to server has a to argument it will send msg to particular user else will send to all user
    socket.on('msg_send', (data) => {
        data.from = socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })

})






app.use('/', express.static(__dirname + '/public'))


server.listen(3000, () => {
    console.log('Server has started')
})