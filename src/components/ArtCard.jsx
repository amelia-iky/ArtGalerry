import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ArtCard = () => {
  const [artworks, setArtworks] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedArtworks = JSON.parse(localStorage.getItem("daftarKarya")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || [];
    setArtworks(storedArtworks);
    setLikedItems(storedLikes);
  }, []);

  const handleLikeToggle = (id) => {
    let updatedArtworks = [...artworks];
    let updatedLikes = [...likedItems];

    if (likedItems.includes(id)) {
      updatedArtworks = updatedArtworks.map((art) => (art.id === id ? { ...art, likes: (art.likes || 1) - 1 } : art));
      updatedLikes = updatedLikes.filter((likedId) => likedId !== id);
    } else {
      updatedArtworks = updatedArtworks.map((art) => (art.id === id ? { ...art, likes: (art.likes || 0) + 1 } : art));
      updatedLikes.push(id);
    }

    setArtworks(updatedArtworks);
    setLikedItems(updatedLikes);
    localStorage.setItem("daftarKarya", JSON.stringify(updatedArtworks));
    localStorage.setItem("likedItems", JSON.stringify(updatedLikes));
  };

  const limitedArtworks = artworks.slice(0, 6); // Batasi 6 item

  return (
    <section className="py-1 px-6">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Karya Terbaru</span>
        </h2>

        <motion.button
          onClick={() => navigate("/ruang-karya")}
          className="bg-white text-blue-600 font-medium px-5 py-2 rounded-full shadow-md hover:bg-blue-50 hover:shadow-lg transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span>Lihat Semua</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      <div className="overflow-x-auto scrollbar-hide px-1">
        <div className="flex space-x-6 pb-4">
          {limitedArtworks.map((art) => {
            const isLiked = likedItems.includes(art.id);
            return (
              <div key={art.id} className="relative group min-w-[260px] overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-xl hover:scale-105 transform transition-all duration-300 flex-shrink-0">
                <img src={art.photo} alt={art.title} className="w-full h-64 object-cover group-hover:brightness-75 transition" />

                {/* Info saat hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3 className="text-white text-lg font-semibold">{art.title}</h3>
                  <p className="text-gray-200 text-sm truncate">{art.description}</p>
                  <p className="text-gray-300 text-xs mt-1">Oleh: {art.artist}</p>
                </div>

                {/* Tombol like mengambang */}
                <div
                  onClick={() => handleLikeToggle(art.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition ${isLiked ? "text-red-500" : "text-gray-600"}`}
                >
                  <span className="text-sm">{art.likes || 0}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 fill-current" viewBox="0 0 24 24">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArtCard;
