import { Col } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { CardEntity } from "../CardEntity";
import type { IProposal } from "../../types/types";
import { getStatusColor } from "../../utils/utilsProposals";
import { useState } from "react";
import { EntrepreneurProfile } from "../Entrepreneur/EntrepreneurProfile";
import { ChallengeModal } from "../Challenge/ChallengeModal";

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
                icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
                borderColor={getStatusColor(proposal.estado)}
            >
                <div style={{ marginTop: 0, fontSize: 12, color: "#91caff" }}>
                    <div
                        onClick={() => openChallengeModal()}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "#69b1ff",
                        }}
                    >
                        <TrophyOutlined /> {proposal.desafioId.titulo}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
                            <UserOutlined />
                            {proposal.emprendedorId.nombreCompleto}
                        </div>
                    </div>

                    <span>{proposal.puntos} puntos</span>

                </div>
            </CardEntity>

            {/* modal perfil emprendedor */}
            <EntrepreneurProfile
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
