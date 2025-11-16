import { useLoginForm } from "../../hooks/Login/useLoginForm";
import { Layout, Card, Form, Input, Button, Typography, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { PaintBucket } from "lucide-react";

const { Title, Text } = Typography;

export const LoginForm = () => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCheckbox
  } = useLoginForm();

  return (
    <Layout
      style={{
        background: "#12395B",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        styles={{
          body: {
            padding: 0,
            display: "flex",
          },
        }}
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#12395B",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >

        {/* IZQUIERDA 60% */}
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "50%",
            minWidth: "320px",
            padding: "40px 32px",
            background: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

          }}
        >
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            Iniciar sesión
          </Title>

          <Text style={{ color: "#ccc" }}>
            Por favor ingrese sus datos de acceso
          </Text>

          <Form
            layout="vertical"
            style={{ marginTop: "24px" }}
            onFinish={handleSubmit}
          >
            {/* EMAIL */}
            <Form.Item
              label={<label htmlFor="email" style={{ color: "#ccc" }}>Email</label>}
              name="email"
              rules={[
                { required: true, message: "El email es obligatorio" },
                { type: "email", message: "Ingrese un email válido" }
              ]}
            >
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                style={{
                  background: "transparent",
                  color: "white",
                  height: "40px",
                }}
              />
            </Form.Item>

            {/* PASSWORD */}
            <Form.Item
              label={<label htmlFor="password" style={{ color: "#ccc" }}>Contraseña</label>}
              name="password"
              rules={[
                { required: true, message: "La contraseña es obligatoria" },
                { min: 4, message: "La contraseña debe tener al menos 4 caracteres" }
              ]}
            >
              <Input.Password
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone twoToneColor="#ffffff" />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "white" }} />
                  )
                }
                style={{
                  background: "transparent",
                  color: "white",
                  height: "40px",
                }}
              />
            </Form.Item>

            {/* RECORDAR */}
            <Form.Item>
              <Checkbox
                id="recordar"
                name="recordar"
                checked={formData.recordar}
                onChange={handleCheckbox}
                style={{ color: "white" }}
              >
                Recordar
              </Checkbox>
            </Form.Item>

            {/* ERROR */}
            {error && (
              <Text type="danger" style={{ marginBottom: "10px", display: "block" }}>
                {error}
              </Text>
            )}

            {/* BOTÓN */}
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "linear-gradient(90deg, #1f8f4b, #2fb36a)",
                border: "none",
                height: "45px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mt-3">
                {error}
              </div>
            )}
          </Form>
        </div>

        {/* DERECHA 40% */}
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "50%",
            minWidth: "320px",
            background: "linear-gradient(135deg, #0a2342, #1a4d7a, #0e3b5b)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <PaintBucket size={80} color="white" style={{ marginBottom: "20px", opacity: 0.85 }} />

          <Title
            level={3}
            style={{ color: "white", textAlign: "center", marginBottom: "10px" }}
          >
            Bienvenido
          </Title>

          <Text
            style={{
              color: "white",
              fontSize: "16px",
              opacity: 0.9,
              textAlign: "center",
            }}
          >
            Plataforma de Desafíos
          </Text>
        </div>
      </Card>
    </Layout>
  );
};
