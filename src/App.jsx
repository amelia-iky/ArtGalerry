import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import KaryaSaya from "./pages/karya_saya";
import DokumentasiVideo from "./pages/ruang_video";
import ProfilePage from "./pages/profil";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import RuangKarya from "./pages/ruang_karya";
import DetailKarya from "./components/detail_karya";
import SenimanPage from "./pages/seniman";
import DetailSeniman from "./components/ProfilSeniman";
import RuangVideo from "./pages/ruang_video";
import "antd/dist/reset.css"; // ini juga penting, bisa ditaruh di sini
// import VideoDetail from "./pages/VideoDetailTemp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-art" element={<KaryaSaya />} />
        <Route path="/ruang-karya/:id" element={<DetailKarya />} />
        <Route path="/ruang-karya" element={<RuangKarya />} />
        <Route path="/seniman/:username" element={<DetailSeniman />} />
        <Route path="/seniman" element={<SenimanPage />} />
        <Route path="/docs" element={<DokumentasiVideo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ruang-video" element={<RuangVideo />} />
        {/* <Route path="/video/:userId/:videoId" element={<VideoDetail />} /> */}

        {/* ✅ Halaman profile sekarang terlindungi */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
