import { BankOutlined, UserOutlined, FlagOutlined, FileTextOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { useAuth } from "../../context/Auth/useAuth";

const { Sider } = Layout;
const { Title } = Typography;

interface AppSidebarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentCompanyId = "1";
    const { _id } = useAuth();
    const currentEntrepreneurId = _id;

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
                        key: "/UserProfile",
                        icon: <UserOutlined />,
                        label: "Perfil",
                        onClick: () => navigate("/UserProfile"),
                    },
                    {
                        key: "/Company",
                        icon: <BankOutlined />,
                        label: "Empresas",
                        onClick: () => navigate("/Company"),
                    },
                    {
                        key: "/Entrepreneur",
                        icon: <UsergroupDeleteOutlined />,
                        label: "Emprendedores",
                        onClick: () => navigate("/Entrepreneur"),
                    },
                    {
                        key: `/Challenge/${currentCompanyId}`,
                        icon: <FlagOutlined />,
                        label: "Mis Desafíos",
                        onClick: () => navigate(`/Challenge/${currentCompanyId}`),
                    },
                    {
                        key: "/Challenge",
                        icon: <FlagOutlined />,
                        label: "Desafíos",
                        onClick: () => navigate("/Challenge"),
                    },
                    {
                        key: "/Proposal",
                        icon: <FileTextOutlined />,
                        label: "Propuestas",
                        onClick: () => navigate("/Proposal"),
                    },
                    {
                        key: `/Proposal/${currentEntrepreneurId}`,
                        icon: <FileTextOutlined />,
                        label: "Mis Propuestas",
                        onClick: () => navigate(`/Proposal/${currentEntrepreneurId}`),
                    },
                ]}
            />
        </Sider>
    );
};
