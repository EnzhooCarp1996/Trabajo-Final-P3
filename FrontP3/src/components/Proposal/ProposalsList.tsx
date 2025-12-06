import { ExportOutlined, FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { EntrepreneurModal } from "../Entrepreneur/EntrepreneurModal";
import { ChallengeModal } from "../Challenge/ChallengeModal";
import { getStatusColorProposals } from "../../utils/utilsProposals";
import type { IProposal } from "../../types/types";
import { CardEntity } from "../CardEntity";
import { useState } from "react";
import { Col } from "antd";

interface ProposalsListProps {
    proposal: IProposal;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({ proposal }) => {
    const [openProfile, setOpenProfile] = useState(false);

    const openProfileModal = () => {
        setOpenProfile(true);
    };

    const [openChallenge, setOpenChallenge] = useState(false);

    const openChallengeModal = () => {
        setOpenChallenge(true);
    };

    return (
        <Col xs={24} sm={12} lg={8} key={proposal._id}>
            <CardEntity
                title={proposal.tituloPropuesta}
                icon={<FileTextOutlined style={{ color: getStatusColorProposals(proposal.estado) }} />}
                borderColor={getStatusColorProposals(proposal.estado)}
            >
                <div style={{ marginTop: 0, fontSize: 12, color: "#91caff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <TrophyOutlined />
                        {proposal.desafioId.titulo}
                        <div
                            onClick={() => openChallengeModal()}
                            style={{ cursor: "pointer", color: "#69b1ff", }}
                        >
                            <ExportOutlined style={{ fontSize: 15 }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <UserOutlined />
                        {proposal.emprendedorId.nombreCompleto}
                        <div
                            onClick={() => openProfileModal()}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "#69b1ff",
                            }}
                        >
                            <ExportOutlined style={{ fontSize: 15 }} />
                        </div>
                    </div>

                    <span>{proposal.puntos} puntos</span>

                </div>
            </CardEntity>

            {/* modal perfil emprendedor */}
            <EntrepreneurModal
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                _id={proposal.emprendedorId._id}
            />

            {/* modal Challenge */}
            <ChallengeModal
                open={openChallenge}
                onClose={() => setOpenChallenge(false)}
                _id={proposal.desafioId._id}
            />
        </Col>

    );
};
