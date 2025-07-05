import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const heroImages = [
  "https://www.whiteboardjournal.com/wp-content/uploads/2022/01/unnamed-2-5.jpg",
  "https://assets.kompasiana.com/items/album/2021/09/17/zodiac-1896-large-6144624406310e7c1d33d7e2.jpg?t=o&v=300",
  "https://um.ac.id/wp-content/uploads/2022/08/Foto-Karya-keramik-berjudul-Takdir-dan-Pilihan-Asmara-1.jpg",
  "https://www.balairungpress.com/wp-content/uploads/2024/11/kilas-november.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXbo3Lh4TF8Nj8dJzNlTG4sto9Q7Q43p5Mhw&s",
  "https://cdn1-production-images-kly.akamaized.net/X1MEySQaeS6vblgM1ldhNrRKS18=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4119938/original/026219700_1660192721-beautiful-roman-figure-carving.jpg",
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] flex flex-col justify-center items-center text-white text-center px-6 overflow-hidden">
      {/* Background Image */}
      <img src="https://wallpapers.com/images/featured/art-dajgwkpkb3im2q3u.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Konten utama */}
      <motion.div className="relative z-20" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Galeri Karya Seni Digital</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">Temukan dan bagikan karya seni terbaik dari seniman berbakat di seluruh Indonesia. Jadilah bagian dari pergerakan seni masa kini.</p>
        <motion.button onClick={() => navigate("/my-art")} className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105" whileHover={{ scale: 1.08 }}>
          🎨 Bagikan Karya Anda
        </motion.button>
      </motion.div>

      {/* Galeri Mini */}
      <motion.div className="mt-10 flex justify-center gap-4 flex-wrap relative z-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
        {heroImages.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            alt={`hero-img-${idx}`}
            className={`rounded-2xl w-28 h-40 object-cover shadow-lg transition-transform duration-300 hover:scale-105
              ${idx % 2 === 0 ? "rotate-[-8deg]" : "rotate-[8deg]"}
            `}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
