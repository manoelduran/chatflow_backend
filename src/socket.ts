import socketio from 'socket.io';

export const listen = (io: socketio.Server) => {

    io.on('connection', (socket) => {
        socket.emit("hello", "world");
        socket.on("pao", (arg) => {
            console.log(arg)
        })
        socket.on("message", (arg) => {
            console.log("arg", arg)
        })
    });
}

module.exports = {
    listen
}