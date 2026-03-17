import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Loby() {
    let [username, setUsername] = useState("");
    let [askUsername, setAskUsername] = useState(true);
    let [videoAvailble, setVideoAvailble] = useState(true);
    let [audioAvailble, setAudioAvailble] = useState(true);
    let [ConnectionVideo, SetconnectionVideo] = useState(null);

    let socketRef = useRef();
    let localVideoRef = useRef();
    let connectionRef = useRef();
    let socketIdRef = useRef();

    const server_url = 'https://projectv1-1.onrender.com';

    const peerConfigConnections = {
        'iceServers': [
            { "urls": "stun:stun.l.google.com:19302" }
        ]
    };

    // Keep function name same: Logic updated to handle tracks and stream assignment
    const getPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            window.localStream = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            setVideoAvailble(true);
            setAudioAvailble(true);
        } catch (e) {
            console.log("Permissions denied or hardware not found:", e);
            setVideoAvailble(false);
            setAudioAvailble(false);
        }
    };

    const initializePeerConnection = (remoteId) => {
        const pc = new RTCPeerConnection(peerConfigConnections);

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('signal', remoteId, JSON.stringify({ 'ice': event.candidate }));
            }
        };

        // Modern track handling (replaces onaddstream)
        pc.ontrack = (event) => {
            SetconnectionVideo({
                socketId: remoteId,
                stream: event.streams[0]
            });
        };

        // Add local tracks to the connection
        if (window.localStream) {
            window.localStream.getTracks().forEach(track => {
                pc.addTrack(track, window.localStream);
            });
        }

        connectionRef.current = pc;
        return pc;
    };

    // Keep function name same: Logic updated to handle async/await and connection init
    let gotMessageFromServer = async (fromId, message) => {
        var signal = JSON.parse(message);

        if (fromId === socketIdRef.current) return;

        // If connection doesn't exist yet (the receiver side), create it
        if (!connectionRef.current) {
            initializePeerConnection(fromId);
        }

        if (signal.sdp) {
            await connectionRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            if (signal.sdp.type === 'offer') {
                const description = await connectionRef.current.createAnswer();
                await connectionRef.current.setLocalDescription(description);
                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connectionRef.current.localDescription }));
            }
        }

        if (signal.ice) {
            try {
                await connectionRef.current.addIceCandidate(new RTCIceCandidate(signal.ice));
            } catch (e) { console.log(e); }
        }
    };

    // Keep function name same: Logic updated for 1-to-1 handshake
    const connectToServer = () => {
        socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {

            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;

            // When a second person joins, the first person starts the offer
            socketRef.current.on('user-joined', async (id) => {
                const pc = initializePeerConnection(id);
                const description = await pc.createOffer();
                await pc.setLocalDescription(description);
                socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': pc.localDescription }));
            });
            
            socketRef.current.on('user-left', () => {
                if (connectionRef.current) {
                    connectionRef.current.close();
                    connectionRef.current = null;
                    SetconnectionVideo(null);
                }
            });
        });
    };

    const getMedia = () => {
        connectToServer();
    };

    const connect = () => {
        setAskUsername(false);
        getMedia();
    };

    useEffect(() => {
        getPermission();
    }, []);

    return (
    <div className="min-h-screen bg-black text-white p-5 flex flex-col items-center">
        {askUsername ? (
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <video ref={localVideoRef} autoPlay muted className="w-full rounded-lg bg-gray-900 border border-gray-700" />
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-10 rounded px-3 bg-gray-800 text-white border border-gray-600"
                    type="text"
                    placeholder="username"
                    value={username}
                />
                <button className='bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold transition' onClick={connect}>Connect</button>
            </div>
        ) : (
            <div className="relative w-full h-[80vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                {/* Remote Video (The other person) */}
                {ConnectionVideo ? (
                    <video
                        className="w-full h-full object-contain"
                        autoPlay
                        ref={el => { if (el && ConnectionVideo.stream) el.srcObject = ConnectionVideo.stream; }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">
                        Waiting for peer to join...
                    </div>
                )}

                {/* --- RED HANG UP BUTTON --- */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <button 
                       
                        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
                        title="End Call"
                    >
                        {/* Phone icon using SVG (Alternative to Lucide) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                            <line x1="23" y1="1" x2="1" y2="23"></line>
                        </svg>
                    </button>
                </div>

                {/* Local Self View */}
                <div className="absolute bottom-4 right-4 w-32 md:w-48 border-2 border-blue-500 rounded-lg overflow-hidden bg-black shadow-2xl z-20">
                    <video 
                        ref={(el) => { if(el) el.srcObject = window.localStream; }} 
                        autoPlay 
                        muted 
                        className="w-full h-full object-cover scale-x-[-1]" 
                    />
                </div>
            </div>
        )}
    </div>
);
}

export default Loby;