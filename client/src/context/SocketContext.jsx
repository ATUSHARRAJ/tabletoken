// import { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext();

// export function SocketProvider({ children }) {
//   const [socket, setSocket] = useState(null);
//   const { isLoggedIn }      = useAuth();

//   useEffect(() => {
//     if (!isLoggedIn) return;

//    const newSocket = io(process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000', {
//   transports: ['websocket'],
// });

//     newSocket.on('connect', () => {
//       console.log('🔌 Socket connected:', newSocket.id);
//     });

//     newSocket.on('disconnect', () => {
//       console.log('❌ Socket disconnected');
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [isLoggedIn]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// export const useSocket = () => useContext(SocketContext);
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    // 1. Automatic Dynamic URL Detection
    // Agar frontend live URL par chal raha hai toh Render ka backend uthayega, nahi toh localhost.
    const BACKEND_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://tabletoken-egkn.onrender.com';

    console.log("🔗 Connecting socket to:", BACKEND_URL);

    // 2. Transports mein polling aur websocket dono allow karein (Render ke liye safe hai)
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true // Agar sessions/cookies handle kar rahe ho toh
    });

    newSocket.on('connect', () => {
      console.log('🔌 Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('⚠️ Socket Connection Error:', err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLoggedIn]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </td>
  );
}

export const useSocket = () => useContext(SocketContext);
