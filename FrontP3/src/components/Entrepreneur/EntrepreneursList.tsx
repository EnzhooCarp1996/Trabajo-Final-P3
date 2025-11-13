import { Col } from "antd"
import type { IUser } from "../../types/types"
import { GridRow } from "../GridRow"
import { CardEntity } from "../CardEntity"
import { UserOutlined } from "@ant-design/icons"

interface EntrepreneursListProps {
    entrepreneurs: IUser[],
    getProposalCount: (id: string) => number;
}

export const EntrepreneursList: React.FC<EntrepreneursListProps> = ({ entrepreneurs, getProposalCount }) => {
    return (
        <GridRow>
            {entrepreneurs.filter(u => u.role === "emprendedor").map((entrepreneur) => (
                <Col xs={24} sm={12} lg={8} key={entrepreneur._id}>
                    <CardEntity
                        title={entrepreneur.nombreCompleto}
                        icon={<UserOutlined />}
                    >
                        <div style={{ color: "#ccc" }}>
                            <strong>Edad:</strong> {entrepreneur.edad} años
                        </div>
                        {getProposalCount(entrepreneur._id)} propuestas
                    </CardEntity>
                </Col>
            ))}
        </GridRow>
    )
}