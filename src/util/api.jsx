import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const registerUser = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/register`, data);
};

// Login User
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Tambah Karya
export const getKaryaList = async () => {
  const res = await fetch(`${BASE_URL}/api/karya_seni`);
  return res.json();
};

export const tambahKarya = async (formData, token) => {
  const res = await fetch(`${BASE_URL}/api/karya_seni`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};

export const likeKarya = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://127.0.0.1:5000/api/karya_seni/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal like karya");
  }

  const data = await res.json();
  return data.like_count;
};

export const unlikeKarya = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://127.0.0.1:5000/api/karya_seni/${id}/unlike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal unlike karya");
  }

  const data = await res.json();
  return data.like_count;
};

// Ambil data user berdasarkan username
export const getUserByUsername = async (username) => {
  const res = await fetch(`${BASE_URL}/api/users/username/${username}`);
  if (!res.ok) {
    throw new Error("User tidak ditemukan");
  }
  return res.json();
};

// Ambil karya dan video dari user ID
export const getUserDetailById = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/detail`);
  if (!res.ok) {
    throw new Error("Gagal ambil detail user");
  }
  return res.json();
};

export const getKaryaTerbaru = async () => {
  const res = await axios.get("http://127.0.0.1:5000/api/karya_seni/beranda");
  return res.data;
};
export const getVideoTerbaru = async () => {
  const res = await fetch("http://127.0.0.1:5000/api/ruang_video/beranda");
  return res.json();
};
