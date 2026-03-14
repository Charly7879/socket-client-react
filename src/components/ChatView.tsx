import { useState, type FormEvent, type ChangeEvent } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatViewProps {
  username: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export function ChatView({ username, messages, onSendMessage }: ChatViewProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen max-h-[600px] w-full max-w-md">
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-white">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No hay mensajes aún</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === username ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-xs text-gray-500">{msg.sender}</span>
                <span
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === username
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
