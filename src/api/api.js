const BASE = "http://localhost:3000/api";

export const registerUser = (data) =>
  fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const createNewChat = (token) =>
  fetch(`${BASE}/chat/new`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const sendChatMessage = (token, body) =>
  fetch(`${BASE}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const fetchChatHistory = (token) =>
  fetch(`${BASE}/chat/history`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const fetchChatById = (token, id) =>
  fetch(`${BASE}/chat/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
