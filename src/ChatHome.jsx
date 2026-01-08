import { useEffect, useState } from "react";
import {
  createNewChat,
  sendChatMessage,
  fetchChatHistory,
  fetchChatById
} from "./api/api";

export default function Chathome() {
  const token = localStorage.getItem("token");
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await fetchChatHistory(token);
    setChats(data);
  };

  const newChat = async () => {
    const chat = await createNewChat(token);
    setChatId(chat._id);
    setMessages([{ text: "Start your conversation", sender: "bot" }]); // simple starting message
    loadHistory();
  };

  const loadChat = async (id) => {
    const msgs = await fetchChatById(token, id);
    setChatId(id);
    setMessages(msgs);
    if (sidebarOpen) setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  const send = async () => {
    if (!input.trim() || !chatId) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);

    const res = await sendChatMessage(token, {
      chatId,
      message: input
    });

    setMessages(prev => [...prev, { text: res.answer, sender: "bot" }]);
    setInput("");
    loadHistory();
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar / Chat History */}
      <div className={`fixed lg:static inset-y-0 left-0 bg-white border-r border-gray-300 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } duration-200 lg:translate-x-0 w-64 flex-shrink-0`}>
        <div className="p-4">
          <button
            onClick={newChat}
            className="border p-2 w-full mb-4 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            + New Chat
          </button>

          <div className="overflow-y-auto h-[calc(100vh-80px)]">
            {chats.map(chat => (
              <div
                key={chat._id}
                className="cursor-pointer mb-2 p-2 border rounded hover:bg-gray-100"
                onClick={() => loadChat(chat._id)}
              >
                <p className="font-semibold text-gray-800">
                  Chat
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full">
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
          <button
            className="lg:hidden p-2 border rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h2 className="font-bold text-lg">Chat</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-2 flex ${m.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <span className={`p-2 rounded-lg max-w-[70%] ${m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}>
                {m.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-white">
          <input
            className="border flex-1 p-2 rounded"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Click 'New Chat' to Start Your Convo..."
          />
          <button
            className="bg-black text-white px-4 rounded hover:bg-gray-800"
            onClick={send}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
