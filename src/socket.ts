import socketio from 'socket.io';

export const listen = (io: socketio.Server) => {

    io.on('connection', (socket) => {
        socket.emit("hello", "world");
        socket.on("pao", (arg) => {
            console.log(arg)
        })
        socket.on("create-room", (arg) => {
            console.log("args create", arg)
            socket.broadcast.emit("created",` ${arg.user.user.username} created a new chat! Let's join in it!`)
        })
        socket.on("join-room", (arg) => {
            console.log("args join", arg)
            socket.broadcast.emit("joined",` ${arg} joined to our chat!`)
        })
        socket.on("authenticate", (arg) => {
            console.log("arg", arg)
            socket.broadcast.emit("authenticated",` ${arg} has been authenticated!`)
        })
        socket.on("message", (arg) => {
            console.log("arg", arg)
            socket.broadcast.emit("sent",` ${arg.text} has been sent!`)
        })
    });
}

module.exports = {
    listen
}