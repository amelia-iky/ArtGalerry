import { useEffect, useState } from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { fetchAllVideos } from "../util/usefetchRuangVideo.jsx";

const { Search } = Input;

const RuangVideo = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState([]);

  // Fungsi untuk fetch ulang data
  const loadVideos = async () => {
    try {
      const data = await fetchAllVideos();
      setVideos(data);
    } catch (error) {
      console.error("Gagal memuat video:", error);
    }
  };

  useEffect(() => {
    loadVideos();

    // Ambil liked dari localStorage
    const rawLiked = JSON.parse(localStorage.getItem("likedVideos"));
    const likedArray = Array.isArray(rawLiked)
      ? rawLiked
      : Object.keys(rawLiked || {});
    setLiked(likedArray);

    // Dengarkan event 'video-updated' untuk refresh otomatis
    const handleRefresh = () => {
      loadVideos();
    };
    window.addEventListener("video-updated", handleRefresh);

    // Cleanup listener saat komponen unmount
    return () => window.removeEventListener("video-updated", handleRefresh);
  }, []);

  const handleLike = (id) => {
    const isLiked = liked.includes(id);
    const updated = videos.map((vid) => {
      if (vid.id === id) {
        return {
          ...vid,
          likes: isLiked
            ? Math.max((vid.likes || 1) - 1, 0)
            : (vid.likes || 0) + 1,
        };
      }
      return vid;
    });

    const newLiked = isLiked
      ? liked.filter((likeId) => likeId !== id)
      : [...liked, id];

    setVideos(updated);
    setLiked(newLiked);
    localStorage.setItem("likedVideos", JSON.stringify(newLiked));
  };

  const filtered = videos.filter(
    (vid) =>
      (vid.title?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (vid.creator?.toLowerCase() || "").includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative overflow-hidden">
      {/* Background efek blur */}
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
        <Search
          placeholder="Cari judul atau nama kreator..."
          onChange={(e) => setQuery(e.target.value)}
          allowClear
          size="large"
          className="rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {filtered.length > 0 ? (
          filtered.map((vid) => {
            const isLiked = liked.includes(vid.id);
            return (
              <motion.div
                key={vid.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href={vid.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      vid.thumbnail || "https://img.youtube.com/vi/default.jpg"
                    }
                    alt={vid.title}
                    className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                  />
                </a>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Oleh:{" "}
                    <span className="font-medium text-gray-800">
                      {vid.creator || "Tidak diketahui"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {vid.description}
                  </p>

                  <div
                    onClick={() => handleLike(vid.id)}
                    className="mt-3 flex items-center gap-1 cursor-pointer select-none w-fit hover:scale-105 transition"
                  >
                    <span className="text-gray-700">{vid.likes || 0}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 transition-all"
                      viewBox="0 0 24 24"
                      style={{ fill: isLiked ? "#ef4444" : "#9ca3af" }}
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                          2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 
                          4.13 2.44h1.74C14.09 5.01 
                          15.76 4 17.5 4 20 4 22 6 
                          22 8.5c0 3.78-3.4 6.86-8.55 
                          11.54L12 21.35z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Tidak ada video ditemukan.
          </p>
        )}
      </div>
    </div>
  );
};

export default RuangVideo;
