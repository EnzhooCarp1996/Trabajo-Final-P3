import { AppSidebar } from './AppSidebar';
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { useState } from "react";
import { Layout } from "antd";

const { Content } = Layout;

export const AppContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

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
            {children}
          </div>
        </Content>

        <AppFooter />

      </Layout>
    </Layout>
  );
};

