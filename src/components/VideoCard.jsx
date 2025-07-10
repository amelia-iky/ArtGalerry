import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VideoCard = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ruang_video");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Gagal memuat video:", err);
    }
  };

  useEffect(() => {
    fetchVideos();

    const handleUpdate = () => fetchVideos();
    window.addEventListener("video-updated", handleUpdate);

    return () => window.removeEventListener("video-updated", handleUpdate);
  }, []);

  const limitedVideos = videos.slice(0, 6);

  return (
    <div className="px-6 pb-28">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Video Terbaru</span>
        </h2>

        <motion.button
          onClick={() => navigate("/ruang-video")}
          className="bg-white text-blue-600 font-medium px-5 py-2 rounded-full shadow-md hover:bg-blue-50 hover:shadow-lg transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span>Lihat Semua</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {limitedVideos.map((video) => (
          <div key={video.id} className="relative group overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-md transition-transform hover:scale-[1.02]">
            <div className="relative">
              <a href={video.link_youtube} target="_blank" rel="noopener noreferrer">
                <img src={video.link_thumbnail} alt={video.judul} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition pointer-events-none flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg truncate">{video.judul}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{video.deskripsi || "-"}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mt-3 pt-2 border-t">
                <span>Oleh: {video.dibuat_oleh}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCard;
