import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-purple-700 to-blue-500 py-12 px-4 mt-0 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bagian Deskripsi */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">ArtGallery</h2>
            <p className="text-white">Platform berbagai karya seni untuk menghubungkan seniman dengan penggemar seni di seluruh Indonesia.</p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li onClick={() => navigate("/")} className="text-white hover:text-blue-300 cursor-pointer transition">
                Beranda
              </li>
              <li onClick={() => navigate("/ruang-karya")} className="text-white hover:text-blue-300 cursor-pointer transition">
                Ruang Karya
              </li>
              <li onClick={() => navigate("/ruang-video")} className="text-white hover:text-blue-300 cursor-pointer transition">
                Ruang Video
              </li>
              <li onClick={() => navigate("/profile")} className="text-white hover:text-blue-300 cursor-pointer transition">
                Profil
              </li>
              <li onClick={() => navigate("/seniman")} className="text-white hover:text-blue-300 cursor-pointer transition">
                Seniman
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-2 text-white">
              <li>Email: info@artgallery.com</li>
              <li>Telepon: +82 123 4567 890</li>
              <li>Alamat: Jl. Seni Raya No. 123, Jakarta</li>
            </ul>
          </div>
        </div>

        <Divider className="my-8" />

        {/* Hak Cipta */}
        <div className="text-center text-white">© 2025 Artelle Team. Hak Cipta Dilindungi.</div>
      </div>
    </footer>
  );
};

export default Footer;
