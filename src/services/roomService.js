const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-beta.vercel.app";

const API_URL = `${API_BASE_URL}/api`;


export const getRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`, {
    cache: "no-store",
    credentials: "include",
  });

  return res.json();
};


export const getRoomById = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  return res.json();
};


export const createRoom = async (roomData) => {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(roomData),
  });

  return res.json();
};


export const updateRoom = async (id, roomData) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(roomData),
  });

  return res.json();
};


export const deleteRoom = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};


export const getMyListings = async (email) => {
  const res = await fetch(`${API_URL}/rooms/my-listings/${email}`, {
    cache: "no-store",
    credentials: "include",
  });

  return res.json();
};