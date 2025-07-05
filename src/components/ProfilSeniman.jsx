import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const DetailSeniman = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [seniman, setSeniman] = useState(null);
  const [karya, setKarya] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username);

    if (!user) {
      navigate("/seniman");
      return;
    }

    setSeniman(user);

    const allKarya = JSON.parse(localStorage.getItem("daftarKarya")) || [];
    const allVideo = JSON.parse(localStorage.getItem("videoList")) || [];

    // Hanya tampilkan karya dan video yang dimiliki user (berdasarkan username)
    // const karyaUser = allKarya.filter((k) => k.owner === user.username);
    // const videoUser = allVideo.filter((v) => v.owner === user.username);
    // console.log(allVideo);

    setKarya(allKarya);
    setVideo(allVideo);
  }, [username, navigate]);

  if (!seniman) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-6 shadow p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar di kiri tengah */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <Avatar size={100} src={seniman.avatar || null} icon={<UserOutlined />} className="bg-blue-500 text-white text-3xl">
              {!seniman.avatar && seniman.name?.charAt(0)}
            </Avatar>
          </div>

          {/* Informasi Seniman */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{seniman.name}</h2>
            <p className="text-blue-600 text-sm">@{seniman.username}</p>
            <p className="text-gray-600 mt-2 whitespace-pre-wrap max-w-xl">{seniman.bio || "Belum ada bio."}</p>
          </div>
        </div>
      </Card>

      <h3 className="text-xl font-semibold mb-3 text-gray-800">🎨 Karya</h3>
      {karya.length >= 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {karya.map((k) => (
            <Link to={`/ruang-karya/${k.id}`} state={{ from: `/seniman/${seniman.username}` }} key={k.id}>
              <Card hoverable cover={<img src={k.photo} alt={k.title} className="h-48 object-cover" />} className="transition hover:shadow-lg">
                <h4 className="text-lg font-semibold">{k.title}</h4>
                <p className="text-sm text-gray-600">{k.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6"> ada karyaBelum.</p>
      )}

      <h3 className="text-xl font-semibold mb-3 text-gray-800">📹 Video</h3>
      {video.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {video.map((v) => (
            <Card key={v.id}>
              {v.thumbnail ? (
                <a href={v.youtubeLink} target="_blank" rel="noopener noreferrer">
                  <img src={v.thumbnail || "https://img.youtube.com/vi/default.jpg"} className="w-full h-48 object-cover" />
                </a>
              ) : (
                <p className="text-sm text-red-500">Video tidak tersedia</p>
              )}
              <h4 className="text-lg font-semibold">{v.title}</h4>
              <p className="text-sm text-gray-600">{v.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Belum ada video.</p>
      )}
    </div>
  );
};

export default DetailSeniman;
