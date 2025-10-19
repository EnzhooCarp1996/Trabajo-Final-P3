import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Typography, Button } from "antd";


const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
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
        </Header>
    )
}