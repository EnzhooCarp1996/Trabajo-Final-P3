import { CalendarOutlined, TrophyOutlined } from "@ant-design/icons";
import type { IChallenge } from "../../types/types";
import { CardEntity } from "../CardEntity";
import { Col } from "antd";


interface ChallengeListProps {
    challenge: IChallenge;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
    challenge,
}) => {
    return (

                <Col xs={24} sm={12} lg={8} key={challenge._id}>
                    <CardEntity
                        title={challenge.titulo}
                        icon={<TrophyOutlined style={{ color: challenge.estado === "activo" ? "#1677ff" : "#aaa" }} />}
                        borderColor={challenge.estado === "activo" ? "#52c41a" : "#db0101ff"}
                        


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
