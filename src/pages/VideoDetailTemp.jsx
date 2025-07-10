import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetailById } from "../util/api";
import { motion } from "framer-motion";

const VideoDetail = () => {
  const { userId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const detail = await getUserDetailById(userId);
        const selectedVideo = detail.ruang_video.find((v) => v.id === parseInt(videoId));
        setVideo(selectedVideo);
      } catch (err) {
        console.error("Gagal ambil detail video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [userId, videoId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!video) return <div className="p-10 text-center text-red-500">Video tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.h1 className="text-3xl font-bold mb-4 text-blue-700" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {video.title}
      </motion.h1>

      <motion.p className="text-gray-600 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        {video.description}
      </motion.p>

      <motion.div className="rounded-xl overflow-hidden shadow-lg mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <img src={video.thumbnail} alt="Thumbnail" className="w-full h-64 object-cover" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-5 py-3 rounded-full shadow hover:bg-red-700 transition">
          Tonton di YouTube
        </a>
      </motion.div>
    </div>
  );
};

export default VideoDetail;
