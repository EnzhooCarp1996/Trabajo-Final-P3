import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Typography, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth";

const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    nombreUsuario?: string;
    //   role: string;
    //   logout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed, nombreUsuario, /* role, logout */ }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleClick = () => {
        navigate("/UserProfile");
    };
    return (
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

            <Space size="middle">
                <Button
                    type="primary"
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                    onClick={handleClick}
                >
                    {nombreUsuario} 
                    {/* ({role}) */}
                </Button>

                <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    danger
                    onClick={logout}
                    style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
                />
            </Space>
        </Header>
    );
};
