import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailKarya = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/ruang-karya";
  const [karya, setKarya] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("daftarKarya")) || [];
    const found = data.find((item) => item.id === parseInt(id));
    setKarya(found);

    const likedList = JSON.parse(localStorage.getItem("likedKarya")) || [];
    setLiked(likedList.includes(parseInt(id)));
  }, [id]);

  const handleLike = () => {
    const all = JSON.parse(localStorage.getItem("daftarKarya")) || [];
    const likedList = JSON.parse(localStorage.getItem("likedKarya")) || [];
    const karyaIndex = all.findIndex((item) => item.id === parseInt(id));
    if (karyaIndex === -1) return;

    const updated = [...all];
    const isLiked = likedList.includes(parseInt(id));

    if (isLiked) {
      updated[karyaIndex].likes = Math.max((updated[karyaIndex].likes || 1) - 1, 0);
      const filteredLiked = likedList.filter((item) => item !== parseInt(id));
      localStorage.setItem("likedKarya", JSON.stringify(filteredLiked));
    } else {
      updated[karyaIndex].likes = (updated[karyaIndex].likes || 0) + 1;
      likedList.push(parseInt(id));
      localStorage.setItem("likedKarya", JSON.stringify(likedList));
    }

    localStorage.setItem("daftarKarya", JSON.stringify(updated));
    setKarya(updated[karyaIndex]);
    setLiked(!liked);
  };

  if (!karya) {
    return (
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">Karya tidak ditemukan.</h2>
        <button onClick={() => navigate("/ruang-karya")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Kembali ke Ruang Karya
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => navigate(from)} className="mb-6 text-blue-600 hover:underline">
        ← Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <img src={karya.photo} alt={karya.title} className="rounded-lg shadow-md w-full object-cover max-h-[500px]" />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{karya.title}</h2>
          <p className="text-gray-600 mb-4">{karya.description}</p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-4">
            <p className="text-sm text-gray-500">Dibuat oleh:</p>
            <p className="text-lg font-semibold text-blue-700">{karya.artist}</p>
          </div>

          <div onClick={handleLike} className="flex items-center gap-2 text-gray-700 mb-6 cursor-pointer w-fit hover:scale-105 transition">
            <span>{karya.likes || 0}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition" viewBox="0 0 24 24" style={{ fill: liked ? "#ef4444" : "#9ca3af" }}>
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

          <a
            href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya tertarik dengan karya Anda yang berjudul "${karya.title}".`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-full shadow-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M16.2 13.5c-.3-.2-1.7-.8-2-1s-.5-.1-.7.1-.8 1-.9 1.1-.3.2-.6.1a7.2 7.2 0 0 1-3.5-3.1c-.2-.3 0-.4.1-.6l.8-1c.1-.2 0-.4-.1-.6s-1.2-2-1.6-2.7c-.4-.8-.8-.7-1.1-.7H5c-.2 0-.6 0-.9.4-.3.3-1.2 1.2-1.2 2.8 0 1.7 1.3 3.4 1.5 3.6s2.6 4 6.3 5.4c.9.3 1.6.5 2.1.6.9.1 1.6.1 2.2.1 1.3 0 3.9-.5 4.4-2.7.6-2.2.6-4 .4-4.3s-.3-.3-.6-.5z" />
              <path fillRule="evenodd" d="M12 0C5.4 0 0 5.4 0 12a11.9 11.9 0 0 0 1.7 6l-1.7 6 6.2-1.6A12 12 0 1 0 12 0zm0 22a9.9 9.9 0 0 1-5.1-1.4L6 21l-3.3.8.9-3-1-1.8a9.9 9.9 0 1 1 9.4 5z" />
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailKarya;
