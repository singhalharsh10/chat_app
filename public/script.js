const socket = io()

// let btnSend = document.getElementById('btnSend')
// let inpMsg = document.getElementById('inpMsg')
// let ulMsgList = document.getElementById('ulMsgList')


// btnSend.onclick = function() {
//     socket.emit('MsgSend', {
//         msg: inpMsg.value
//     })
//     inpMsg.value
// }

// // This function will add msg emit from io from server.js onto all users or all parallel local host webpage
// socket.on('msg_rcvd', (data) => {
//     let linewMsg = document.createElement('li')
//     linewMsg.innerText = data.msg
//     ulMsgList.appendChild(linewMsg)
// })



// // // messgae from server to client
// // socket.on('whizz', () => {
// //     let div = document.createElement('div')
// //     div.innerText = 'whizz'
// //     document.body.appendChild(div)
// // })


// Writing code in Jquery




$('#loginBox').show()
    // We have hide chatbox until login is done
$('#chatBox').hide()

// Sending username and pass to server
$('#btnstart').click(() => {
    socket.emit('login', {
        username: $('#inpUserName').val(),
        password: $('#inpPass').val(),

    })
})


socket.on('logged_in', () => {
    $('#loginBox').hide()
    $('#chatBox').show()
})

socket.on('login-failed', () => {
    window.alert('Username or password wrong')
})


$('#btnSendMsg').click(() => {
    socket.emit('msg_send', {
        // for sendib msg to a particular user
        to: $('#inpToUser').val(),
        msg: $('#inpNewMsg').val()
    })

})

// executed after server emit recvd msg
socket.on('msg_rcvd', (data) => {
    $('#ulMsg').append($('<li>').text(
        `[${data.from}]: ${data.msg}`
    ))
})