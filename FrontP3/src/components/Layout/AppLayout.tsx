import React, { useState } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BankOutlined,
  UserOutlined,
  FlagOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={220}
        breakpoint="md" // 🔹 Colapsa automáticamente en pantallas medianas o menores
        onBreakpoint={(broken) => {
          setCollapsed(broken); // 🔹 Cuando la pantalla es pequeña, colapsa
        }}
        style={{
          backgroundColor: "#001529",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.1)",
            margin: "16px",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          {!collapsed && (
            <Title level={4} style={{ color: "white", margin: 0, fontSize: 16 }}>
              Plataforma de Desafíos
            </Title>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <BankOutlined />, label: "Empresas" },
            { key: "2", icon: <FlagOutlined />, label: "Desafíos" },
            { key: "3", icon: <UserOutlined />, label: "Emprendedores" },
            { key: "4", icon: <FileTextOutlined />, label: "Propuestas" },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            backgroundColor: "#002140",
            color: "white",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              color: "white",
              width: 48,
              height: 48,
            }}
          />

          <Title level={4} style={{ color: "white", margin: 0 }}>
            Panel
          </Title>
        </Header>

        <Content
          style={{
            backgroundColor: "#0a1f44",
            padding: "24px 32px",
            color: "white",
            minHeight: "calc(100vh - 128px)",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: "24px",
              minHeight: "100%",
            }}
          >
            {children || "Aquí va el contenido principal de tu aplicación."}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
            color: "rgba(255,255,255,0.65)",
            padding: "12px 0",
          }}
        >
          ©2025 Plataforma de Desafíos | By Enzo Olmedo
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
