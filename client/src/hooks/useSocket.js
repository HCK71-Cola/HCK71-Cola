// hooks/useSocket.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
