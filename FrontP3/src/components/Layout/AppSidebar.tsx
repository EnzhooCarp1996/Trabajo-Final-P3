import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import {
    BankOutlined,
    UserOutlined,
    FlagOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { Title } = Typography;

interface AppSidebarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={220}
            breakpoint="md"
            onBreakpoint={(broken) => {
                setCollapsed(broken);
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
                selectedKeys={[location.pathname]}
                items={[
                    {
                        key: "/Company",
                        icon: <BankOutlined />,
                        label: "Empresas",
                        onClick: () => navigate("/Company"),
                    },
                    {
                        key: "/Challenge",
                        icon: <FlagOutlined />,
                        label: "Desafíos",
                        onClick: () => navigate("/Challenge"),
                    },
                    {
                        key: "/Entrepreneur",
                        icon: <UserOutlined />,
                        label: "Emprendedores",
                        onClick: () => navigate("/Entrepreneur"),
                    },
                    {
                        key: "/Proposal",
                        icon: <FileTextOutlined />,
                        label: "Propuestas",
                        onClick: () => navigate("/Proposal"),
                    },
                ]}
            />
        </Sider>
    );
};
