import { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VideoCard = () => {
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem("videoList")) || [];
    const videosWithLikes = savedVideos.map((v) => ({
      ...v,
      likes: v.likes || 0,
    }));
    setVideos(videosWithLikes);
    const likedData = JSON.parse(localStorage.getItem("likedVideos")) || {};
    setLikedVideos(likedData);
  }, []);

  const toggleLike = (videoId) => {
    const updatedLikes = { ...likedVideos };
    let updatedVideos = [...videos];

    if (updatedLikes[videoId]) {
      delete updatedLikes[videoId];
      updatedVideos = updatedVideos.map((v) => (v.id === videoId ? { ...v, likes: Math.max((v.likes || 1) - 1, 0) } : v));
    } else {
      updatedLikes[videoId] = true;
      updatedVideos = updatedVideos.map((v) => (v.id === videoId ? { ...v, likes: (v.likes || 0) + 1 } : v));
    }

    setLikedVideos(updatedLikes);
    setVideos(updatedVideos);
    localStorage.setItem("likedVideos", JSON.stringify(updatedLikes));
    localStorage.setItem("videoList", JSON.stringify(updatedVideos));
  };

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
              <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
                <img src={video.thumbnail} alt={video.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition pointer-events-none flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg truncate">{video.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{video.description || "-"}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mt-3 pt-2 border-t">
                <span>Oleh: {video.author}</span>
                <button onClick={() => toggleLike(video.id)} className="cursor-pointer flex items-center gap-1 z-10 relative">
                  {likedVideos[video.id] ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                  <span>{video.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCard;
