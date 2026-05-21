const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://studynook-server-2.onrender.com";

const API_URL = `${API_BASE_URL}/api`;

/*
GET ALL ROOMS
*/
export const getRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`, {
    credentials: "include",
  });

  return res.json();
};

/*
GET SINGLE ROOM
*/
export const getRoomById = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    credentials: "include",
  });

  return res.json();
};

/*
CREATE ROOM
*/
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

/*
UPDATE ROOM
*/
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

/*
DELETE ROOM
*/
export const deleteRoom = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};

/*
GET MY LISTINGS
*/
export const getMyListings = async (email) => {
  const res = await fetch(`${API_URL}/rooms/my-listings/${email}`, {
    credentials: "include",
  });

  return res.json();
};