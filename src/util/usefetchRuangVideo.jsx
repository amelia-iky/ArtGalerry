// src/util/usefetchRuangVideo.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchAllVideos = async () => {
  const res = await fetch("http://localhost:5000/api/ruang_video");
  const data = await res.json();

  // Normalisasi field agar konsisten dengan frontend
  return data.map((v) => ({
    ...v,
    title: v.judul,
    description: v.deskripsi,
    youtubeLink: v.link_youtube,
    thumbnail: v.link_thumbnail,
  }));
};
