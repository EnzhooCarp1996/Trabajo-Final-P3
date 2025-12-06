import { Badge, Dropdown, List, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/Auth/useAuth";
import type { ICompanyRef, IEntrepreneurRef } from "../../types/types";


const { Text } = Typography;

export function NotificationBell() {
    const { notifications, handleMarkAsSeen } = useAuth();

    const unseenCount = notifications?.filter((n) => !n.visto).length;
    console.log("🔄 Render NotificationBell - notificaciones:", notifications);

    const getSenderName = (from: IEntrepreneurRef | ICompanyRef) => {
        if ("nombreEmpresa" in from) {
            return from.nombreEmpresa;
        }
        if ("nombreCompleto" in from) {
            return from.nombreCompleto;
        }
        return "Usuario";
    }

    const dropdownContent = () => (
        <div
            style={{
                width: 330,
                maxHeight: 400,
                overflowY: "auto",
                background: "rgba(20,20,20,0.9)",
                padding: 10,
                borderRadius: 12,
                backdropFilter: "blur(8px)",
            }}
        >
            {notifications.length === 0 ? (
                <Text style={{ color: "white" }}>No tienes notificaciones</Text>
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => handleMarkAsSeen(item._id)}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                background: item.visto
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(255,255,255,0.15)",
                                marginBottom: 8,
                                borderRadius: 10,
                                transition: "0.2s",
                            }}
                        >
                            <List.Item.Meta
                                title={
                                    <Text style={{ color: "white" }}>
                                        {getSenderName(item.fromUserId)}
                                    </Text>
                                }
                                description={
                                    <Text style={{ color: "#ddd" }}>{item.contenido}</Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    return (
        <Dropdown
            dropdownRender={dropdownContent}
            trigger={["click"]}
            placement="bottomRight"
        >
            <Badge count={unseenCount} size="small">
                <BellOutlined
                    style={{ fontSize: 28, color: "white", cursor: "pointer" }}
                />
            </Badge>
        </Dropdown>
    );
}
