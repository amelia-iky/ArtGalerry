import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { registerUser } from "../util/api"; // pastikan file ini ada

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        nama_lengkap: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      };

      const res = await registerUser(payload);

      // ✅ Gunakan res.status === 201 (bukan success atau string)
      if (res?.status === 201) {
        message.success("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        const msg = res.data?.message || "Registrasi gagal.";
        message.error("❌ " + msg);
      }
    } catch (err) {
      console.error("Register Error:", err);
      const msg = err.response?.data?.message || "Terjadi kesalahan saat mendaftar.";
      message.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Daftar Akun</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Nama Lengkap" rules={[{ required: true, message: "Nama wajib diisi!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Nama Lengkap" />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username wajib diisi!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email wajib diisi!" },
              { type: "email", message: "Format email tidak valid!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password wajib diisi!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Daftar
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
