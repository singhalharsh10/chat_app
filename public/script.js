const socket = io()

let btnSend = document.getElementById('btnSend')
let inpMsg = document.getElementById('inpMsg')
let ulMsgList = document.getElementById('ulMsgList')


btnSend.onclick = function() {
    socket.emit('MsgSend', {
        msg: inpMsg.value
    })
    inpMsg.value
}

// This function will add msg emit from io from server.js onto all users or all parallel local host webpage
socket.on('msg_rcvd', (data) => {
    let linewMsg = document.createElement('li')
    linewMsg.innerText = data.msg
    ulMsgList.appendChild(linewMsg)
})



// // messgae from server to client
// socket.on('whizz', () => {
//     let div = document.createElement('div')
//     div.innerText = 'whizz'
//     document.body.appendChild(div)
// })