import { Col, Select } from "antd";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { CardEntity } from "../CardEntity";
import type { IProposal, ProposalStatus } from "../../types/types";
import { useAuth } from "../../context/Auth/useAuth";
import { getStatusColor } from "../../utils/utilsProposals";

interface ProposalsListProps {
    proposal: IProposal;
    openModalProposal?: (proposal: IProposal) => void;
    handleDelete?: (id: string) => void;
    onChangeEstado?: (id: string, value: ProposalStatus) => void;
    readOnly?: boolean;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
    proposal,
    openModalProposal,
    handleDelete,
    onChangeEstado,
    readOnly = false,
}) => {

    const { role } = useAuth()


    return (
        <Col xs={24} sm={12} lg={8} key={proposal._id}>
            <CardEntity
                iconoBoton={<span

                    style={{
                        cursor: "pointer",
                        fontSize: "25px",
                        transition: "0.2s",

                    }}
                >
                    ★
                </span>}

                title={proposal.tituloPropuesta}
                icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
                borderColor={getStatusColor(proposal.estado)}
                onEdit={!readOnly ? () => openModalProposal && openModalProposal(proposal) : undefined}
                onDelete={!readOnly ? () => handleDelete && handleDelete(proposal._id) : undefined}
                showButtonNew={role === "emprendedor" ? false : true}

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
                        {(role === "emprendedor") ?
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

    );
};
