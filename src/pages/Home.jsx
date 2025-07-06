import HeroSection from "../components/HeroSection";
import ArtCard from "../components/ArtCard";
import VideoCard from "../components/VideoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const sampleSlides = [
  {
    src: "https://www.jalanmelali.com/wp-content/uploads/2022/10/museum-di-bali.jpg",
    title: "Gerakan Waktu",
  },
  {
    src: "https://ik.trn.asia/uploads/2021/10/1635083168480.jpeg",
    title: "Lanskap Imajinasi",
  },
  {
    src: "https://nusaweek.com/wp-content/uploads/2023/10/Patung-patung.jpg",
    title: "Ekspresi Warna",
  },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <main className="lex-grow text-gray-900 bg-gradient-to-br from-white via-pink-100 to-blue-200">
      <HeroSection />
      {/* Statistik */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            { count: "5.2K", label: "Digital Artworks" },
            { count: "2.1K", label: "Active Artists" },
            { count: "50K", label: "Art Collectors" },
            { count: "180", label: "Countries" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-3xl font-bold text-blue-700">{item.count}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.label}</p>
              <div className="w-10 h-1 mt-4 mx-auto rounded-full bg-gradient-to-r from-indigo-400 to-blue-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Slider Hero Karya */}
      <section className="w-full">
        <Slider {...settings}>
          {sampleSlides.map((slide, index) => (
            <div key={index} className="relative h-[500px] overflow-hidden">
              <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl">{slide.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      {/* Karya Unggulan */}
      <section className="relative py-16 text-center px-4 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-2xl z-0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />

        <motion.h2 className="text-4xl md:text-5xl font-bold text-white relative z-10 mb-3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">Karya Terbaru</span>
        </motion.h2>

        <motion.p className="text-black text-lg max-w-xl mx-auto mb-10 relative z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          Karya seni terbaru dari seniman terbaik kami.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="relative z-10">
          <ArtCard />
        </motion.div>
      </section>

      {/* Video Terbaru */}
      <section className="pt-5 pb-0 text-center px-4 mb-0">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">Video Terbaru</span>
        </motion.h2>

        <motion.p className="text-black text-lg max-w-xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          Dokumentasi proses dan kisah di balik karya para seniman.
        </motion.p>

        <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
          <VideoCard />
        </motion.div>
      </section>
      {/* Testimoni */}
      <section className="pt-20 pb-28 px-4 text-center bg-gradient-to-br from-purple-100 via-indigo-400 to-white-100 text-white relative overflow-hidden">
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <span className="bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">Apa Kata Mereka</span>
        </motion.h2>

        <motion.p className="text-lg max-w-2xl mx-auto mb-12 text-white/90" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          Cerita dan kesan dari para seniman, kolektor, dan penikmat seni yang telah merasakan pengalaman luar biasa bersama ArtGallery.
        </motion.p>

        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 px-4">
          {[
            {
              name: "Laras, Seniman Digital",
              feedback: "ArtGallery memberi saya panggung untuk memamerkan karya seni saya ke khalayak yang lebih luas.",
              avatar: "https://i.pravatar.cc/100?img=47",
            },
            {
              name: "Dimas, Kolektor",
              feedback: "Sangat mudah menemukan karya yang menarik dan berkualitas. Saya suka antarmukanya!",
              avatar: "https://i.pravatar.cc/100?img=12",
            },
            {
              name: "Anita, Pengunjung",
              feedback: "Tampilannya memukau! Setiap halaman penuh dengan inspirasi dan keindahan visual.",
              avatar: "https://i.pravatar.cc/100?img=32",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 text-left border border-white/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={item.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                <h4 className="font-semibold text-white">{item.name}</h4>
              </div>
              <p className="text-white/90 italic">“{item.feedback}”</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
