import { CalendarOutlined, TrophyOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ChallengeStatus, IChallenge } from "../../../types/types";
import { Button, List, Space, Avatar, Divider } from "antd";
import { StatusSelect } from "./StatusSelect";

interface ChallengeDescriptionsProps {
    challenge: IChallenge;
  toggleStatus: (challenge: IChallenge, newEstado: ChallengeStatus) => Promise<void>;
    openModal: (challenge: IChallenge) => void;
    handleDelete: (id: string) => void;
}

export const ChallengeDescriptions: React.FC<ChallengeDescriptionsProps> = ({
    challenge,
    toggleStatus,
    openModal,
    handleDelete,
}) => {


    return (
        <List.Item
            style={{
                backgroundColor: '#fff',
                marginBottom: '8px',
                borderRadius: '8px',
                padding: '16px'
            }}
            actions={[
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => openModal(challenge)}
                >
                    Editar
                </Button>,
                <Button
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(challenge._id)}
                >
                    Eliminar
                </Button>,
            ]}
        >
            <List.Item.Meta
                avatar={
                    <Avatar
                        size="large"
                        icon={<TrophyOutlined />}
                        style={{
                            backgroundColor: challenge.estado === "activo" ? "#52c41a" :
                                challenge.estado === "finalizado" ? "#1677ff" : "#d9d9d9"
                        }}
                    />
                }
                title={
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                        <span>{challenge.titulo}</span>

                        <StatusSelect
                            estado={challenge.estado}
                            onChange={(value: string) => toggleStatus(challenge, value as ChallengeStatus)}
                        />

                    </Space>
                }
                description={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                            {challenge.descripcion}
                        </div>

                        <Divider style={{ margin: "12px 0" }} />

                        <Space size="large" style={{ fontSize: 13, color: "#8c8c8c" }}>
                            <span>Creado el día</span>
                            <span>
                                <CalendarOutlined /> {new Date(challenge.createdAt).toLocaleDateString()}
                            </span>

                        </Space>
                    </Space>
                }
            />
        </List.Item>
    );
};