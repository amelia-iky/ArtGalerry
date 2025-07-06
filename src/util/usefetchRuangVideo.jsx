// src/util/usefetchRuangVideo.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchAllVideos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/ruang_video`);
    if (!res.ok) throw new Error("Failed to fetch videos");

    const data = await res.json();

    return data.map((vid) => ({
      id: vid.id,
      title: vid.judul,
      creator: vid.dibuat_oleh,
      description: vid.deskripsi,
      youtubeLink: vid.link_youtube,
      thumbnail: vid.link_thumbnail,
      likes: vid.likes ?? 0,
    }));
  } catch (err) {
    console.error("Error fetching videos:", err);
    return [];
  }
};
