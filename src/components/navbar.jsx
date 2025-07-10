import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://127.0.0.1:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser({
          name: res.data.nama_lengkap,
          avatar: res.data.foto_profil,
          username: res.data.username,
        });
      } catch (err) {
        console.error("Gagal ambil data user navbar:", err);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();

    window.addEventListener("user-logged-in", fetchCurrentUser);
    return () => window.removeEventListener("user-logged-in", fetchCurrentUser);
  }, []);

  const isActive = (path) => location.pathname === path;

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ArtSpace
      </Link>

      <nav className="hidden md:flex gap-6">
        <Link to="/" className={isActive("/") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>
          Beranda
        </Link>
        <Link to="/ruang-karya" className={isActive("/ruang-karya") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>
          Ruang Karya
        </Link>
        <Link to="/ruang-video" className={isActive("/ruang-video") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>
          Ruang Video
        </Link>
        <Link to="/seniman" className={isActive("/seniman") ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>
          Seniman
        </Link>
        {/* Tombol "Profil" dihapus */}
      </nav>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <button onClick={goToProfile} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
            <Avatar src={currentUser.avatar || null} icon={<UserOutlined />} size="small" />
            <span className="text-gray-700 font-medium">{currentUser.name?.split(" ")[0]}</span>
          </button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-1 text-sm rounded hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
