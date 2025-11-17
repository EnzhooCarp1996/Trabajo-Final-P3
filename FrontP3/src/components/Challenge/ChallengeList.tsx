import { CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import type { IChallenge } from "../../types/types";
import { CardEntity } from "../CardEntity";
import { Button, Col } from "antd";


interface ChallengeListProps {
    challenge: IChallenge;
    toggleStatus?: (challenge: IChallenge) => void;
    openModal?: (challenge: IChallenge) => void;
    handleDelete?: (id: string) => void;
    readOnly?: boolean;
    openModalProposal?: (challenge?: IChallenge) => void;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
    challenge,
    toggleStatus,
    openModal,
    handleDelete,
    readOnly,
    openModalProposal,
}) => {
    return (

                <Col xs={24} sm={12} lg={8} key={challenge._id}>
                    <CardEntity
                        tituloBoton={"Propuesta"}
                        iconoBoton={<PlusOutlined />}
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
                        onDelete={!readOnly ? () => handleDelete && handleDelete(challenge._id) : undefined}
                        onNuevoClick={challenge.estado === "activo" ? () => openModalProposal?.(challenge) : undefined}


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
                                <CalendarOutlined /> {new Date(challenge.createdAt).toLocaleDateString()}
                            </div>
                            <div>{challenge.empresaId.nombreEmpresa}</div>
                        </div>
                    </CardEntity>
                </Col>

    );
};
