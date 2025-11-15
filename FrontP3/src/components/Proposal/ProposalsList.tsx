import { Col, Select } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { GridRow } from "../GridRow";
import { CardEntity } from "../CardEntity";
import type { IProposal, ProposalStatus } from "../../types/types";

interface ProposalsListProps {
    votedProposals: string[],
    proposals: IProposal[];
    getStatusColor: (estado: string) => string;
    getChallengeName: (id: string) => string;
    getEntrepreneurName: (id: string) => string | undefined;
    openModalProposal?: (proposal: IProposal) => void;
    handleDelete?: (id: string) => void;
    onChangeEstado?: (id: string, value: ProposalStatus) => void;
    toggleVoto: (id: string) => void;
    readOnly?: boolean;
    showButtonNew?: boolean;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
    votedProposals,
    proposals,
    getStatusColor,
    getChallengeName,
    getEntrepreneurName,
    openModalProposal,
    handleDelete,
    onChangeEstado,
    toggleVoto,
    readOnly = false,
    showButtonNew,
}) => {



    return (
        <GridRow>
            {proposals.map((proposal) => (
                <Col xs={24} sm={12} lg={8} key={proposal._id}>
                    <CardEntity
                        iconoBoton={<span
                            onClick={() => toggleVoto(proposal._id)}
                            style={{
                                cursor: "pointer",
                                fontSize: "25px",
                                transition: "0.2s",
                                color: votedProposals.includes(proposal._id) ? "#fadb14" : "rgba(255,255,255,0.3)",
                                transform: votedProposals.includes(proposal._id) ? "scale(1.2)" : "scale(1)",
                            }}
                        >
                            ★
                        </span>}
                        tituloBoton={votedProposals.includes(proposal._id) ? "Sacar Voto" : "Votar"}
                        title={proposal.tituloPropuesta}
                        icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
                        borderColor={getStatusColor(proposal.estado)}
                        onEdit={!readOnly ? () => openModalProposal && openModalProposal(proposal) : undefined}
                        onDelete={!readOnly ? () => handleDelete && handleDelete(proposal._id) : undefined}
                        showButtonNew={!showButtonNew} // siempre true, para que aparezca el botón
                        onNuevoClick={() => toggleVoto(proposal._id)} // tu lógica de votar
                    >
                        {proposal.descripcion}

                        <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <TrophyOutlined /> {getChallengeName(proposal.desafioId)}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <UserOutlined /> {getEntrepreneurName(proposal.emprendedorId)}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

                                <span
                                    onClick={() => toggleVoto(proposal._id)}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "25px",
                                        transition: "0.2s",
                                        color: votedProposals.includes(proposal._id) ? "#fadb14" : "rgba(255,255,255,0.3)",
                                        transform: votedProposals.includes(proposal._id) ? "scale(1.2)" : "scale(1)",

                                    }}
                                >
                                    ★
                                </span>

                            </div>

                            <span>{proposal.puntos} puntos</span>
                            <div style={{ marginTop: 4 }}>
                                {(showButtonNew) ?
                                    (<span
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
                                    ) : (
                                        <Select
                                            size="small"
                                            value={proposal.estado || ""}
                                            style={{
                                                width: "120px",
                                                backgroundColor: getStatusColor(proposal.estado),
                                                color: "#fff",
                                                borderRadius: 4,
                                            }}
                                            onChange={(value) => onChangeEstado?.(proposal._id, value)}
                                            options={[
                                                { value: "", label: "Seleccione" },
                                                { value: "en revision", label: "En revisión" },
                                                { value: "seleccionada", label: "Seleccionada" },
                                                { value: "descartada", label: "Descartada" },
                                            ]}
                                        />
                                    )}

                            </div>
                        </div>
                    </CardEntity>
                </Col>
            ))}
        </GridRow>
    );
};
