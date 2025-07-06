import { useEffect, useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getKaryaList, likeKarya, unlikeKarya } from "../util/api";

const { Search } = Input;

const RuangKarya = () => {
  const [artworks, setArtworks] = useState([]);
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    fetchKarya();

    const likedData = JSON.parse(localStorage.getItem("likedKarya")) || [];
    setLiked(likedData);
  }, []);

  const fetchKarya = async () => {
    try {
      const data = await getKaryaList();
      const formatted = data.map((karya) => ({
        id: karya.id,
        title: karya.judul_karya,
        description: karya.deskripsi,
        photo: `http://127.0.0.1:5000/${karya.link_foto}`,
        artist: karya.artist || "Anonim",
        likes: karya.like_count || 0,
      }));
      setArtworks(formatted);
      localStorage.setItem("daftarKarya", JSON.stringify(formatted));
    } catch (err) {
      console.error("Gagal fetch karya:", err);
    }
  };

  const handleLike = async (id) => {
    const isLiked = liked.includes(id);

    try {
      const newLikeCount = isLiked ? await unlikeKarya(id) : await likeKarya(id);

      const updated = artworks.map((art) => (art.id === id ? { ...art, like_count: newLikeCount } : art));

      const newLiked = isLiked ? liked.filter((likeId) => likeId !== id) : [...liked, id];

      setArtworks(updated);
      setLiked(newLiked);
      localStorage.setItem("likedKarya", JSON.stringify(newLiked));
    } catch (err) {
      console.error("Gagal melakukan (un)like:", err);
    }
  };

  const filtered = artworks.filter((art) => art.title.toLowerCase().includes(query.toLowerCase()) || art.artist.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-pink-100 to-blue-200">
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-8 relative z-10 bg-gradient-to-r from-purple-100 via-indigo-500 to-pink-700 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ruang Karya
        </motion.h2>

        {/* Search */}
        <div className="mb-8 relative z-10 max-w-xl mx-auto">
          <Search placeholder="Cari judul atau nama seniman..." onChange={(e) => setQuery(e.target.value)} allowClear size="large" className="rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((art) => {
              const isLiked = liked.includes(art.id);
              return (
                <div key={art.id} className="border rounded shadow overflow-hidden bg-white">
                  <Link to={`/ruang-karya/${art.id}`}>
                    <img src={art.photo} alt={art.title} className="rounded-xl object-cover w-full h-48 transition-transform duration-300 hover:scale-105" />
                  </Link>
                  <div className="p-4">
                    <Link to={`/ruang-karya/${art.id}`}>
                      <h3 className="text-lg font-semibold hover:underline">{art.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-600">Oleh: {art.artist}</p>
                    <p className="text-sm text-gray-500">{art.description}</p>

                    <div onClick={() => handleLike(art.id)} className="mt-2 flex items-center gap-1 cursor-pointer select-none w-fit hover:scale-105 transition">
                      <span>{art.like_count || 0}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-all" viewBox="0 0 24 24" style={{ fill: isLiked ? "#ef4444" : "#9ca3af" }}>
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
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">Tidak ada karya ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuangKarya;
