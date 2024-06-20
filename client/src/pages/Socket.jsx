import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { useTheme } from "../contexts/ThemeContext";

export default function ChatRoom() {
  const socket = useSocket();
  const [sent, setSent] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("UserId");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (socket) {
      setLoading(false);
      socket.emit("messages");

      socket.on("messages", (data) => {
        setMessages(data);
      });

      return () => {
        socket.off("messages");
      };
    }
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    const body = {
      userId: userId,
      text: sent,
    };
    socket.emit("messages:post", body);

    setSent("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v2m0 14v2m9-9h-2m-14 0H3m15.364 7.364l-1.414-1.414M6.343 6.343l-1.414-1.414m0 12.728l1.414-1.414m12.728 0l1.414-1.414M16.243 9.757a4 4 0 11-8.486 0 4 4 0 018.486 0z"
      />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3C9.243 3 7 5.243 7 8c0 2.757 2.243 5 5 5s5-2.243 5-5c0-2.757-2.243-5-5-5zm0 1.5a3.502 3.502 0 011.95 6.464 5.993 5.993 0 000 5.036A3.502 3.502 0 0112 18.5a3.502 3.502 0 01-1.95-6.464 5.993 5.993 0 000-5.036A3.502 3.502 0 0112 4.5z"
      />
    </svg>
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${
        theme === "light"
          ? "from-green-400 to-blue-500"
          : "from-gray-700 to-gray-900"
      }`}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 py-4 px-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Chat Room
          </h2>
          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
        <div className="overflow-y-auto max-h-96 px-4 py-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col mb-4 ${
                message.UserId == userId ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.UserId == userId
                    ? "bg-green-500 text-white self-end animate-fadeIn"
                    : "bg-gray-200 text-gray-900 self-start animate-fadeIn"
                }`}
              >
                <p>{message.text}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.sender} ·{" "}
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSend}
          className="bg-gray-100 py-3 px-4 flex items-center"
        >
          <input
            value={sent}
            onChange={(e) => setSent(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
