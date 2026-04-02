import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";



import { IconButton, Stack, Tooltip } from '@mui/material';
import { CallEnd, Mic, MicOff, Videocam, VideocamOff, ScreenShare } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import {SocketContext} from "../context/socketContext";


function Loby() {
    let [username, setUsername] = useState("");
    let [askUsername, setAskUsername] = useState(true);
    let [videoAvailble, setVideoAvailble] = useState(true);
    let [audioAvailble, setAudioAvailble] = useState(true);
    let [ConnectionVideo, SetconnectionVideo] = useState(null);

    let [micOn, setMicOn] = useState(true);
    let [cameraOn, setCameraOn] = useState(true)

    let localVideoRef = useRef();
    let connectionRef = useRef();
    let socketIdRef = useRef();

    let Navigate = useNavigate();
    let {socketRef} = useContext(SocketContext); 
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
       // socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

       // socketRef.current.on('connect', () => {

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

    const toggleMic = () => {
        if (window.localStream) {
            const audioTrack = window.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMicOn(audioTrack.enabled);
            }
        }
    };

    const toggleCamera = () => {
        if (window.localStream) {
            const videoTrack = window.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setCameraOn(videoTrack.enabled);
            }
        }
    };

    const handleHangUp = () => {
        if (connectionRef.current) connectionRef.current.close();
        if (window.localStream) {
            window.localStream.getTracks().forEach(track => track.stop());
        }
        if (socketRef.current) {
        socketRef.current.emit('leave-call'); 
        }
        Navigate("/"); // Sabse clean reset
    };


const ControlBar = () => (
  <Stack 
    direction="row" 
    spacing={2} 
    sx={{ 
      position: 'absolute', 
      bottom: 30, 
      left: '50%', 
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: '10px 20px',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      zIndex: 100
    }}
  >
    {/* Mic Button */}
    <Tooltip title={micOn ? "Mute Mic" : "Unmute Mic"}>
      <IconButton 
         onClick={toggleMic} 
        sx={{ color: 'white', bgcolor: micOn ? 'transparent' : '#f44336' }}
      >
        {micOn ? <Mic /> : <MicOff />}
      </IconButton>
    </Tooltip>

    {/* Hang Up Button */}
    <Tooltip title="End Call">
      <IconButton 
        onClick={handleHangUp} 
        sx={{ 
          color: 'white', 
          bgcolor: '#f44336', 
          '&:hover': { bgcolor: '#d32f2f' },
          width: '56px',
          height: '56px'
        }}
      >
                <CallEnd />
            </IconButton>
    </Tooltip>

    {/* Video Button */}
    <Tooltip title={cameraOn ? "Turn Off Video" : "Turn On Video"}>
      <IconButton 
        onClick={toggleCamera} 
        sx={{ color: 'white', bgcolor: cameraOn ? 'transparent' : '#f44336' }}
      >
        {cameraOn ? <Videocam /> : <VideocamOff />}
      </IconButton>
    </Tooltip>

    
        </Stack>
     );




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
            <div className="relative w-full h-[95vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
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

                <ControlBar />

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