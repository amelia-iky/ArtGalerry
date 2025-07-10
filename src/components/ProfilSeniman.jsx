import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserByUsername, getUserDetailById } from "../util/api";
const DetailSeniman = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [seniman, setSeniman] = useState(null);
  const [karya, setKarya] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByUsername(username);
        setSeniman(user);

        const detail = await getUserDetailById(user.id);

        const karyaData = (detail.karya_seni || []).map((k) => ({
          id: k.id,
          title: k.judul_karya,
          description: k.deskripsi,
          photo: `http://127.0.0.1:5000/${k.link_foto}`,
        }));

        const videoData = (detail.ruang_video || []).map((v) => ({
          id: v.id,
          title: v.judul,
          description: v.deskripsi,
          youtubeLink: v.link_youtube,
          thumbnail: v.link_thumbnail?.startsWith("http") ? v.link_thumbnail : `http://127.0.0.1:5000/${v.link_thumbnail}`,
        }));

        console.log("📺 Data video:", videoData);

        setKarya(karyaData);
        setVideo(videoData);
      } catch (error) {
        console.error("Error loading profile:", error);
        navigate("/seniman");
      }
    };

    fetchData();
  }, [username, navigate]);

  if (!seniman) return <p className="text-center text-gray-500">Memuat profil...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-6 shadow p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 flex justify-center items-center">
            <Avatar size={100} src={seniman.foto_profil || null} icon={<UserOutlined />} className="bg-blue-500 text-white text-3xl">
              {!seniman.foto_profil && seniman.nama_lengkap?.charAt(0)}
            </Avatar>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{seniman.nama_lengkap}</h2>
            <p className="text-blue-600 text-sm">@{seniman.username}</p>
            <p className="text-gray-600 mt-2 whitespace-pre-wrap max-w-xl">{seniman.bio || "Belum ada bio."}</p>
          </div>
        </div>
      </Card>

      <h3 className="text-xl font-semibold mb-3 text-gray-800">🎨 Karya</h3>
      {karya.length > 0 ? (
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
        <p className="text-gray-500 mb-6">Belum ada karya yang diunggah.</p>
      )}

      <h3 className="text-xl font-semibold mb-3 text-gray-800">📹 Video</h3>
      {video.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {video.map((v) => (
            <Card key={v.id}>
              {v.thumbnail ? (
                <a href={v.youtubeLink} target="_blank" rel="noopener noreferrer">
                  <img src={v.thumbnail} className="w-full h-48 object-cover" alt={v.title} />
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
