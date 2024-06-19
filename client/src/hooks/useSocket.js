import { useEffect, useState } from 'react'
import { io } from "socket.io-client";


export default function useSocket(){
    const [socket, setSocket] = useState(null) 


    useEffect(()=> {
        const newSocket = io("http://localhost:3000", {
            auth: {
                token: localStorage.getItem("token"),
            }
        })
        setSocket(newSocket)

        return () => newSocket.close()
    }, [])

    return socket
}