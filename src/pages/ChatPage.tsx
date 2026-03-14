import { useState, useEffect, useRef } from 'react';
import { ChatView, type Message } from '../components/ChatView.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export function ChatPage() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: user?.username ?? 'Anonymous',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <span className="text-gray-700">Hola, {user.username}</span>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Cerrar sesión
        </button>
      </div>
      <ChatView
        username={user.username}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      <div ref={messagesEndRef} />
    </div>
  );
}
