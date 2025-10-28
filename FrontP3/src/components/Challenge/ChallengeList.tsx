import { CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined, TrophyOutlined } from "@ant-design/icons";
import type { Challenge } from "../../types/types";
import { CardEntity } from "../CardEntity";
import { GridRow } from "../GridRow";
import { Button, Col } from "antd";


interface ChallengeListProps {
    challenges: Challenge[];
    getCompanyName: (empresaId: string) => string;
    toggleStatus?: (challenge: Challenge) => void;
    openModal?: (challenge: Challenge) => void;
    handleDelete?: (id: string) => void;
    readOnly?: boolean;
    showButtonNew?: boolean;
    openModalProposal?: (challenge?: Challenge) => void;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
    challenges,
    getCompanyName,
    toggleStatus,
    openModal,
    handleDelete,
    readOnly = false,
    showButtonNew,
    openModalProposal,
}) => {
    return (
        <GridRow>
            {challenges.map((challenge) => (
                <Col xs={24} sm={12} lg={8} key={challenge.id}>
                    <CardEntity
                        title={challenge.titulo}
                        icon={<TrophyOutlined style={{ color: challenge.estado === "activo" ? "#1677ff" : "#aaa" }} />}
                        borderColor={challenge.estado === "activo" ? "#52c41a" : "#db0101ff"}
                        extraActions={
                            !readOnly
                                ? [
                                    <Button
                                        key="toggle"
                                        type="text"
                                        icon={
                                            challenge.estado === "activo" ? (
                                                <CheckCircleOutlined style={{ color: "green" }} />
                                            ) : (
                                                <CloseCircleOutlined style={{ color: "red" }} />
                                            )
                                        }
                                        onClick={() => toggleStatus && toggleStatus(challenge)}
                                    />
                                ]
                                : []
                        }
                        onEdit={!readOnly ? () => openModal && openModal(challenge) : undefined}
                        onDelete={!readOnly ? () => handleDelete && handleDelete(challenge.id) : undefined}
                        {...(challenge.estado === "activo"
                            ? {
                                showButtonNew,
                                onNuevoClick: () => openModalProposal?.(challenge),
                            }
                            : {})}

                    >
                        {challenge.descripcion}
                        <div
                            style={{
                                marginTop: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 12,
                                color: "#91caff",
                            }}
                        >
                            <div>
                                <CalendarOutlined /> {new Date(challenge.fechaPublicacion).toLocaleDateString()}
                            </div>
                            <div>{getCompanyName(challenge.empresaId)}</div>
                        </div>
                    </CardEntity>
                </Col>
            ))}
        </GridRow>
    );
};
