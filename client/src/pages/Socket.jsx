import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Socket() {
  const socket = useSocket();
  const [sent, setSent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket?.emit("messages");
    socket?.on("messages", (data) => {
      setMessages(data);
    });
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    const body = {
      sender: localStorage.getItem("token"),
      text: sent,
    };
    console.log(body);
    socket.emit("messages:post", body);

    setSent("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="relative w-full max-w-2xl bg-white bg-opacity-90 shadow-lg rounded-lg p-6 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Chat Room
        </h2>
        <div className="overflow-y-auto max-h-96 mb-4 p-4 bg-gray-50 rounded-lg shadow-inner">
          {messages.map((el, index) => {
            const isSender = el.sender === localStorage.getItem("token");
            return (
              <div
                key={index}
                className={`flex mb-2 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    isSender
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p>{el.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSend} className="flex">
          <input
            value={sent}
            onChange={(el) => setSent(el.target.value)}
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
