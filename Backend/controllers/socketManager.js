import { Server } from "socket.io";

export const connectToSocket = (server)=>{

    const io = new Server(server , {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection" , (socket)=>{
      console.log("Something Connected");

      socket.on('join-call' , (path)=>{
        socket.join(path);
        socket.to(path).emit("user-joined", socket.id);
    
      } );

        
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });



        socket.on('leave-call', (path) => {
            socket.to(path).emit('user-left', socket.id);
           
        });

        socket.on('join-chat', (path) => {
            socket.join(path);
            socket.to(path).emit('user-joind-chat', socket.id);
        });

        socket.on('send-message' , (message)=>{
            console.log("Message received on server:", message);
            let {data  , path} = message;
    
            socket.to(path).emit("receive-message", message);

        });



        


        socket.on('disconnect', () => {
            console.log("User disconnected and rooms cleaned up automatically.");
        });

        socket.on('disconnecting', () => {
            socket.rooms.forEach(room => {
                if (room !== socket.id) { 
                    socket.to(room).emit('user-left', socket.id);
                }
            });
        });


    })



    return io;

}