import { Message } from "@/types/chats";
import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    const ws = new WebSocket(`wss://${BASE_URL}/ws${url}`);

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    setSocket(ws);

    return () => ws.close();
  }, [url]);

  const sendMessage = (message: { chatId: string; text: string }) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
