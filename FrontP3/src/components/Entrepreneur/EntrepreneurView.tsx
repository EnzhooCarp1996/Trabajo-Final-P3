import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";

import { HeaderEntity } from "../HeaderEntity";
import { Carousel, Col, Space } from "antd";
import { CardEntity } from "../CardEntity";
import { UserOutlined } from "@ant-design/icons";


export const EntrepreneurView = () => {
    const { entrepreneurs, loading, getProposalCount } = useEntrepreneurView();

    return (
        <>
            {/* Encabezado */}
            <HeaderEntity titulo="Emprendedores" />

            {/* lista de emprendedores */}
            {/* <EntrepreneursList entrepreneurs={entrepreneurs} getProposalCount={getProposalCount} /> */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Space wrap size="large">
                    {entrepreneurs.map((entrepreneur, index) => (

                        <CardEntity
                            key={index}
                            title={entrepreneur.nombreCompleto}
                            icon={<UserOutlined />}
                        >
                            <div style={{ color: "#ccc" }}>
                                <strong>Edad:</strong> {entrepreneur.edad} años
                            </div>
                            {getProposalCount(entrepreneur._id)} propuestas
                        </CardEntity>

                    ))}
                </Space>
            )}
        </>
    );
}
