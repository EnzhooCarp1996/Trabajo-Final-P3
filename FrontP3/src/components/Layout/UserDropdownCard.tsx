import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

interface UserDropdownCardProps {
    nombre: string;
    role: string;
    email: string;
    onProfile: () => void;
    onLogout: () => void;
}

export const UserDropdownCard: React.FC<UserDropdownCardProps> = ({ nombre, role, email, onProfile, onLogout }) => {
    return (
        <div
            style={{
                background: "#102a43",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                color: "white",
                width: "260px",
                marginTop: "12px"
            }}
        >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Avatar size={48}>{nombre || "U"}</Avatar>

                <div style={{ lineHeight: "1.1" }}>
                    <div style={{ fontWeight: 800 }}>{nombre}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{role}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{email}</div>
                </div>
            </div>

            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <Button type="primary" block onClick={onProfile}>
                    Ver Perfil
                </Button>

                <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    danger
                    onClick={onLogout}
                    style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
                >
                 Cerrar Sesión
                </Button>
            </div>
        </div>
    );
};
