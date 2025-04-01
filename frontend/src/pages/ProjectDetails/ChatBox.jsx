import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/messages/chat/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Atualiza a cada 5s
    return () => clearInterval(interval);
  }, [projectId, token]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    try {
      const response = await fetch("http://localhost:8080/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: userId,
          projectId: projectId,
          content: message,
        }),
      });

      if (response.ok) {
        setMessage("");
        const newMessage = await response.json();
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 mb-2 ${
                msg.sender_id === userId ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender_id !== userId && (
                <Avatar>
                  <AvatarFallback>
                    {msg.sender?.fullName?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="space-y-2 py-2 px-5 border rounded-xl">
                <p className="font-bold">{msg.sender?.fullName || "Anônimo"}</p>
                <p className="text-gray-300">{msg.content}</p>
                <p className="text-xs text-gray-400">{msg.created_at}</p>
              </div>

              {msg.sender_id === userId && (
                <Avatar>
                  <AvatarFallback>Você</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="relative p-0">
          <Input
            placeholder="Type here..."
            className="py-7 border-t outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
