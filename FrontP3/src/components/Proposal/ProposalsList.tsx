import { Col } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { CardEntity } from "../CardEntity";
import type { IProposal } from "../../types/types";
import { getStatusColor } from "../../utils/utilsProposals";
import { useState, type ReactNode } from "react";
import { ProfileModal } from "../UserProfile/ProfileModal";

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
    const [openProfile, setOpenProfile] = useState(false);
    
    const openProfileModal = () => {
        setOpenProfile(true);
    };


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
                <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <TrophyOutlined /> {proposal.desafioId.titulo}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div
                            onClick={openProfileModal}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "#69b1ff",
                            }}
                        >
                            <UserOutlined />
                            {proposal.emprendedorId.nombreCompleto}
                        </div>

                    </div>

            

                    <span>{proposal.puntos} puntos</span>
                    
                </div>
            </CardEntity>
            
            <ProfileModal
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                _id={proposal.emprendedorId._id}
            />

        </Col>

    );
};
