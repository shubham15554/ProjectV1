import React, { createContext, useEffect, useRef , useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
 
    const socketRef = useRef();
   let [isconnected, setIsConnected] = useState(false);
    useEffect(() => {
        socketRef.current = io("https://projectv1-1.onrender.com", {
            transports: ["websocket"], // Recommended for Render.com
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to Socket.IO server with ID:", socketRef.current.id);
            setIsConnected(true);
        });
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);
    if(isconnected){
        return (
        <SocketContext.Provider value={{ socketRef }}>
            {children}
        </SocketContext.Provider>
    );
    }else{
      return <p>Socket is connecting.......</p>;
    }
   
};