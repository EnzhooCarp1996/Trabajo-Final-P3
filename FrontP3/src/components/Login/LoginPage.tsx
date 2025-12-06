import { useState } from "react";
import { useLoginForm } from "../../hooks/Login/useLoginForm";
import { Layout, Card, Typography, Button, Segmented } from "antd";
import { LoginForm } from "./LoginForm";
import { FlagOutlined } from "@ant-design/icons";
import { FormGeneralItem } from "../FormGeneralItem";
import { CompanyForm } from "../Company/CompanyForm";
import { EntrepreneurForm } from "../Entrepreneur/EntrepreneurForm";
import { FormGeneral } from "../FormGeneral";
import { FormPassword } from "../FormPassword";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCheckbox,
    formRegister,
    handleSubmitRegister,
  } = useLoginForm();

  const [isRegister, setIsRegister] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState<"empresa" | "emprendedor">("empresa");

  return (
    <Layout
      style={{ background: "#12395B", alignItems: "center", justifyContent: "center", }}
    >
      <Card
        styles={{ body: { padding: 0, display: "flex", }, }}
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#12395B",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 40px 40px rgba(0,0,0,0.4)",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* IZQUIERDA */}
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "50%",
            minWidth: "320px",
            padding: "40px 32px",
            background: "#102a43",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* TÍTULO */}
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </Title>

          <Text style={{ color: "#ccc" }}>
            {isRegister
              ? "Seleccione el tipo de usuario y complete los datos"
              : "Por favor ingrese sus datos de acceso"}
          </Text>

          {/* SI ES REGISTRO: MOSTRAR SELECTOR */}
          {isRegister && (
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Segmented
                options={[
                  { label: "Empresa", value: "empresa" },
                  { label: "Emprendedor", value: "emprendedor" },
                ]}
                value={tipoRegistro}
                onChange={(v) =>
                  setTipoRegistro(v as "empresa" | "emprendedor")
                }
              />
            </div>
          )}

          {/* FORMULARIOS */}
          {!isRegister ? (
            <LoginForm
              formData={formData}
              error={error}
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCheckbox={handleCheckbox}
            />
          ) : (
            <FormGeneral
              form={formRegister}
              handleSubmit={(values) =>
                handleSubmitRegister({ ...values, role: tipoRegistro }).then(() => {
                  setIsRegister(false);
                })
              }
            >
              {tipoRegistro === "empresa" ? <CompanyForm /> : <EntrepreneurForm />}
              <FormGeneralItem />
              <FormPassword form={formRegister} />
              <Button type="primary" htmlType="submit" loading={loading} block>
                Registrarme
              </Button>
            </FormGeneral>

          )}


          {/* BOTÓN CAMBIAR A REGISTRO / LOGIN */}
          <Button
            type="link"
            style={{ color: "#1890ff", marginTop: 10 }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "¿Ya tenés cuenta? Iniciar sesión"
              : "¿No tenés cuenta? Registrate"}
          </Button>
        </div>

        {/* DERECHA */}
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
          <FlagOutlined style={{ fontSize: 80, color: "white" }} />

          <Title
            level={3}
            style={{ color: "white", textAlign: "center", marginBottom: "10px" }}
          >
            Bienvenido
          </Title>

          <Text
            style={{ color: "white", fontSize: "16px", opacity: 0.9, textAlign: "center", }}
          >
            Plataforma de Desafíos Empresariales
          </Text>
        </div>
      </Card>
    </Layout>
  );
};
