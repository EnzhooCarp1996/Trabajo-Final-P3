import { Col } from "antd"
import { CardEntity } from "../CardEntity"
import { GridRow } from "../GridRow"
import { BankOutlined, GlobalOutlined, PhoneOutlined } from "@ant-design/icons"
import type { User } from "../../types/types"


interface CompaniesListProps {
    companies: User[]
}
export const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {

    return (
        <GridRow>
            {companies.filter(u => u.role === "empresa").map((company) => (
                <Col xs={24} sm={12} lg={8} key={company.id}>
                    <CardEntity
                        title={company.nombreEmpresa}
                        icon={<BankOutlined />}
                    >
                        {company.descripcion}
                        <div style={{ marginTop: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                                <GlobalOutlined />{" "}
                                <a href={company.sitioWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#91caff" }}>
                                    {company.sitioWeb}
                                </a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                                <PhoneOutlined /> {company.telefono}
                            </div>
                        </div>
                    </CardEntity>
                </Col>
            ))}
        </GridRow>
    )
}