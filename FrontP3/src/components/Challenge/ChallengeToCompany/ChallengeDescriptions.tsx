import { CalendarOutlined, TrophyOutlined, EditOutlined, DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import type { ChallengeStatus, IChallenge } from "../../../types/types";
import { Button, List, Space, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    return (
        <List.Item
            style={{ backgroundColor: '#001529', marginBottom: '8px', borderRadius: '8px', padding: '16px' }}
            actions={[
                <Button type="link" icon={<EditOutlined />} onClick={() => openModal(challenge)} >
                    Editar
                </Button>,
                <Button danger type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(challenge._id)}>
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
                    <div
                        style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 8, alignItems: "center", }} >
                        <div>
                            <strong
                                style={{ color: "#69b1ff" }}
                                
                            >
                                {challenge.titulo}
                            </strong>

                        </div>

                        <StatusSelect
                            isChallenge
                            estado={challenge.estado}
                            onChange={(value: string) => toggleStatus(challenge, value as ChallengeStatus)}
                        />

                    </div>
                }
                description={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <Space size="large" style={{ fontSize: 13, color: "#8c8c8c" }}>
                            <span>Ver propuestas</span>
                            <div onClick={() => navigate(`/ProposalsEditing/${challenge._id}`)} style={{ cursor: "pointer", color: "#69b1ff", }} >
                                <ExportOutlined style={{ fontSize: 15 }} />
                            </div>

                        </Space>
                        <Space size="large" style={{ fontSize: 13, color: "#8c8c8c" }}>
                            <span>Creado el día</span>
                            <span><CalendarOutlined /> {new Date(challenge.createdAt).toLocaleDateString()}</span>

                        </Space>
                    </Space>
                }
            />
        </List.Item>
    );
};