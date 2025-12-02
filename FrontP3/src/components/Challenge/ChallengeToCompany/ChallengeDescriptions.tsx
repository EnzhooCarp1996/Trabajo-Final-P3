import { CalendarOutlined, TrophyOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ChallengeStatus, IChallenge } from "../../../types/types";
import { Button, List, Space, Avatar } from "antd";
import { StatusSelect } from "./StatusSelect";

interface ChallengeDescriptionsProps {
    challenge: IChallenge;
    toggleStatus: (challenge: IChallenge, newEstado: ChallengeStatus) => Promise<void>;
    openModal: (challenge: IChallenge) => void;
    handleDelete: (id: string) => void;
    onOpenProposals: () => void;
}

export const ChallengeDescriptions: React.FC<ChallengeDescriptionsProps> = ({
    challenge,
    toggleStatus,
    openModal,
    handleDelete,
    onOpenProposals
}) => {


    return (
        <List.Item
            style={{
                backgroundColor: '#001529',
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
                                challenge.estado === "finalizado" ? "#1677ff" : "red"
                        }}
                    />
                }
                title={
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                        <div>
                            <strong
                                style={{ color: "#69b1ff", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => onOpenProposals()}
                            >
                                {challenge.titulo}
                            </strong>

                        </div>

                        <StatusSelect
                            estado={challenge.estado}
                            onChange={(value: string) => toggleStatus(challenge, value as ChallengeStatus)}
                        />

                    </Space>
                }
                description={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
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