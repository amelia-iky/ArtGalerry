const BASE_URL = "http://127.0.0.1:5000";

// Register User
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
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
