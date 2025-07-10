import { useEffect, useState } from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { fetchAllVideos } from "../util/usefetchRuangVideo.jsx";

const { Search } = Input;

const RuangVideo = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const allVideos = await fetchAllVideos();
        setVideos(allVideos);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    loadData();
  }, []);

  const filtered = videos.filter((vid) => (vid.title?.toLowerCase() || "").includes(query.toLowerCase()) || (vid.dibuat_oleh?.toLowerCase() || "").includes(query.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-pink-100 to-blue-200">
      <div className="max-w-6xl mx-auto p-6">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl z-0" />

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-100 via-indigo-500 to-pink-700 bg-clip-text text-transparent relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ruang Video
        </motion.h2>

        <div className="mb-8 relative z-10 max-w-xl mx-auto">
          <Search placeholder="Cari judul atau nama kreator..." onChange={(e) => setQuery(e.target.value)} allowClear size="large" className="rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {filtered.length > 0 ? (
            filtered.map((vid) => (
              <motion.div
                key={vid.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a href={vid.youtubeLink} target="_blank" rel="noopener noreferrer">
                  <img src={vid.thumbnail || "https://img.youtube.com/vi/default.jpg"} alt={vid.title} className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300" />
                </a>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{vid.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Oleh: <span className="font-medium text-gray-800">{vid.dibuat_oleh || "Tidak diketahui"}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{vid.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">Tidak ada video ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuangVideo;
