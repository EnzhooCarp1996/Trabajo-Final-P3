import React from "react";
import { Col } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";
import { GridRow } from "../GridRow"; // ajustá la ruta según tu estructura
import { CardEntity } from "../CardEntity"; // ajustá la ruta según tu estructura
import type { Proposal } from "../../types/types";

interface ProposalsListProps {
    proposals: Proposal[];
    getStatusColor: (estado: string) => string;
    getChallengeName: (id: string) => string;
    getEntrepreneurName: (id: string) => string;
    openModalProposal: (proposal: Proposal) => void;
    handleDelete: (id: string) => void;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
    proposals,
    getStatusColor,
    getChallengeName,
    getEntrepreneurName,
    openModalProposal,
    handleDelete,
}) => {
    return (
        <GridRow>
            {proposals.map((proposal) => (
                <Col xs={24} sm={12} lg={8} key={proposal.id}>
                    <CardEntity
                        title={proposal.tituloPropuesta}
                        icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
                        borderColor={getStatusColor(proposal.estado)}
                        onEdit={() => openModalProposal(proposal)}
                        onDelete={() => handleDelete(proposal.id)}
                    >
                        {proposal.descripcion}

                        <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <TrophyOutlined /> {getChallengeName(proposal.desafioId)}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <UserOutlined /> {getEntrepreneurName(proposal.emprendedorId)}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <StarOutlined /> {proposal.puntos} puntos
                            </div>

                            <div style={{ marginTop: 4 }}>
                                <span
                                    style={{
                                        padding: "2px 6px",
                                        borderRadius: 4,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        backgroundColor: getStatusColor(proposal.estado),
                                        color: "#fff",
                                    }}
                                >
                                    {proposal.estado}
                                </span>
                            </div>
                        </div>
                    </CardEntity>
                </Col>
            ))}
        </GridRow>
    );
};
