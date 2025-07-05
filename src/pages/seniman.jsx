import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Search } = Input;

const SenimanPage = () => {
  const [senimanList, setSenimanList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setSenimanList(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    const hasil = senimanList.filter((s) => `${s.name} ${s.username} ${s.bio || ""}`.toLowerCase().includes(query.toLowerCase()));
    setFiltered(hasil);
  }, [query, senimanList]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 via-indigo-500 to-pink-700 bg-clip-text text-transparent relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🎨Temukan Seniman
      </motion.h2>

      <motion.p className="text-center text-gray-600 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Jelajahi karya dari seniman berbakat dan penuh inspirasi
      </motion.p>

      <motion.div className="flex justify-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Search placeholder="Cari nama seniman, gaya, atau medium..." onChange={(e) => setQuery(e.target.value)} style={{ maxWidth: 500 }} allowClear size="large" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((user, i) => (
          <motion.div
            key={user.username}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center transition duration-300 group border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative w-fit mx-auto mb-4">
              <Avatar src={user.avatar} size={80} icon={<UserOutlined />} className="bg-purple-500 text-white text-xl border-4 border-white shadow-md">
                {!user.avatar && user.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition">{user.name || "Tanpa Nama"}</h3>
            <p className="text-blue-500 mb-2">@{user.username}</p>

            <p className="text-sm text-gray-600 min-h-[60px]">{user.bio ? user.bio.slice(0, 100) : "Belum ada bio."}</p>

            <Button type="primary" className="mt-4 bg-purple-600 hover:bg-purple-700 w-full rounded-full font-medium" onClick={() => navigate(`/seniman/${user.username}`)}>
              Lihat Profil & Karya
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SenimanPage;
