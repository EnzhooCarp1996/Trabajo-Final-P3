import { Layout } from "antd";

const { Footer } = Layout;

export const AppFooter = () => {
    return (
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
    )
}