//Server-side :[observer]
module.exports.chatSockets=function(socketServer){
    let io=require("socket.io")(socketServer,{cors: {origin: "*"}});

    io.sockets.on("connection",function(socket){
        console.log("new connection recieved ", socket.id);
        
        socket.on('send_message',(data)=>{
            socket.join(data.chatRoom);
            // console.log("new message recieved : ",data);
            io.to(data.chatRoom).emit('rcvd_msg',data);
        });
    });
};
//usually event ocurring in the backend and frontend would be by the same name.
//but for establishing connection we use connect[frontend,suscriber] and connection[backend,observer]
//connect event=> connection here=> emits to (tells the) suscriber with connect keyword that it has been connected.