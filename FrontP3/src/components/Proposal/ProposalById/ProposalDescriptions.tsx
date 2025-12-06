import { CalendarOutlined, FileTextOutlined, EditOutlined, DeleteOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, List, Space, Avatar, Divider, Tag } from "antd";
import { getStatusColorProposals } from "../../../utils/utilsProposals";
import type { IProposal } from "../../../types/types";

interface ProposalDescriptionsProps {
    proposal: IProposal;
    openModal: (proposal: IProposal, form?: any) => void;
    handleDelete: (id: string) => void;
}

export const ProposalDescriptions: React.FC<ProposalDescriptionsProps> = ({
    proposal,
    openModal,
    handleDelete,
}) => {
    return (
        <List.Item style={{ backgroundColor: '#8dc8f4', marginBottom: '8px', borderRadius: '8px', padding: '16px' }}
            actions={[
                <Button type="link" icon={<EditOutlined />} onClick={() => openModal(proposal)} >
                    Editar
                </Button>,
                <Button danger type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(proposal._id)} >
                    Eliminar
                </Button>,
            ]}
        >
            <List.Item.Meta
                avatar={
                    <Avatar size="large" icon={<FileTextOutlined />} style={{ backgroundColor: getStatusColorProposals(proposal.estado) }} />
                }
                title={
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                        <span style={{ fontWeight: 600 }}>{proposal.tituloPropuesta}</span>
                        <Tag
                            color={getStatusColorProposals(proposal.estado)}
                            style={{ borderRadius: 12, color: 'white', fontWeight: 600 }}
                        >
                            {proposal.estado?.toUpperCase()}
                        </Tag>
                    </Space>
                }
                description={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                            {proposal.descripcion}
                        </div>

                        <Divider style={{ margin: "12px 0" }} />

                        <Space size="large" style={{ fontSize: 13, color: "#8c8c8c" }}>
                            <span>Creado el día</span>
                            <span>
                                <CalendarOutlined /> {new Date(proposal.createdAt).toLocaleDateString()}
                            </span>
                        </Space>

                        <Space size="large" style={{ fontSize: 13, color: "#8c8c8c" }}>
                            <span>
                                <TrophyOutlined /> {proposal.desafioId?.titulo || "Desafío no disponible"}
                            </span>
                            <span><strong>{proposal.puntos} puntos</strong></span>
                        </Space>
                    </Space>
                }
            />
        </List.Item>
    );
};