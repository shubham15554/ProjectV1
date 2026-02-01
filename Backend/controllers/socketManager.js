import { Server } from "socket.io";


let connections = {};
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

       if(connections[path] == undefined){
        connections[path] = [];
       }
       

        for(let a = 0; a < connections[path].length; a++) {
            io.to(connections[path][a]).emit("user-joined", socket.id);
        }

        
        connections[path].push(socket.id);


      } );

        
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })



    })



    return io;

}