const express = require('express')
const serve = express()

const http = require('http')
const appHttp = http.createServer(serve).listen(3000, () => {
    console.log("开发服务器启动成功辣")
});

const socket = require('socket.io')
io = socket(appHttp, {
    cors: {
        origin: "*"
    }
})

io.on('connection', sock => {
    // 向客户端发送连接成功的消息
    sock.emit('connectionSuccess');
    // 加入房间
    sock.on('joinRoom', (roomId) => {
        sock.join(roomId)
    })
    // 请求通话
    sock.on('requestCall', (roomId) => {
        io.to(roomId).emit('requestCall')
    })
    // 同意通话
    sock.on('agreeCall', (roomId) => {
        io.to(roomId).emit('agreeCall')
    })
    // 发送offer
    sock.on('sendOffer', ({ offer, roomId }) => {
        io.to(roomId).emit('sendOffer', offer)
    })
    // 发送answer
    sock.on('sendAnswer', ({ answer, roomId }) => {
        io.to(roomId).emit('sendAnswer', answer)
    })
    // 发送candidate
    sock.on('sendCandidate', ({ candidate, roomId }) => {
        io.to(roomId).emit('sendCandidate', candidate)
    })
    // 断开
    sock.on('breakCall', (roomId) => {
        io.to(roomId).emit('breakCall')
    })
})