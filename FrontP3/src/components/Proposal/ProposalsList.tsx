import { Col } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { CardEntity } from "../CardEntity";
import type { IProposal } from "../../types/types";
import { getStatusColor } from "../../utils/utilsProposals";
import type { ReactNode } from "react";

interface ProposalsListProps {
    proposal: IProposal;
    openModalProposal?: (proposal: IProposal) => void;
    handleDelete?: (id: string) => void;
    readOnly?: boolean;
    showButtonNew?: boolean;
    iconoBoton?: ReactNode;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
    proposal,
    openModalProposal,
    handleDelete,
    readOnly = false,
    showButtonNew,
    iconoBoton,
}) => {


    return (
        <Col xs={24} sm={12} lg={8} key={proposal._id}>
            <CardEntity
                iconoBoton={iconoBoton}
                title={proposal.tituloPropuesta}
                icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
                borderColor={getStatusColor(proposal.estado)}
                onEdit={!readOnly ? () => openModalProposal && openModalProposal(proposal) : undefined}
                onDelete={!readOnly ? () => handleDelete && handleDelete(proposal._id) : undefined}
                showButtonNew={showButtonNew}
            >
                {proposal.descripcion}

                <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <TrophyOutlined /> {proposal.desafioId.titulo}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <UserOutlined /> {proposal.emprendedorId.nombreCompleto}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

                        <span
                            style={{
                                cursor: "pointer",
                                fontSize: "25px",
                                transition: "0.2s",
                            }}
                        >
                            ★
                        </span>

                    </div>

                    <span>{proposal.puntos} puntos</span>
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

    );
};
