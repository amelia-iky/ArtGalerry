import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, notification, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../util/api";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await loginUser(values);

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        message.success("Login berhasil!");
        navigate("/profile");
      } else {
        notification.error({
          message: "Login Gagal",
          description: res.message || "Email atau password salah.",
          placement: "topRight",
        });
      }
    } catch (err) {
      notification.error({
        message: "Login Error",
        description: "Tidak dapat menghubungi server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="Masukkan email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Masukkan password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500">
            Daftar
          </a>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
