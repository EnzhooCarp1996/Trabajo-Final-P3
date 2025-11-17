import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";
import { HeaderEntity } from "../HeaderEntity";
import { Card, Space, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EntrepreneurProposals } from "./EntrepreneurProposals";

export const EntrepreneurView = () => {
    const { entrepreneurs, loading, selectedEntrepreneur, isModalOpen, openModal, closeModal } = useEntrepreneurView();

    return (
        <>
            {/* Encabezado */}
            <HeaderEntity titulo="Emprendedores" />

            {/* Lista */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Space wrap size="large">
                    {entrepreneurs.map((entrepreneur) => (
                        <Card
                            key={entrepreneur._id}
                            hoverable
                            onClick={() => openModal(entrepreneur)}
                            style={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "white",
                                border: `1px solid`,
                                borderRadius: 12,
                                cursor: "pointer",
                                width: 300,
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "white", display: "flex", alignItems: "center", gap: 8, fontSize: 20 }}>
                                    <UserOutlined />
                                    {entrepreneur.nombreCompleto}
                                </span>
                            </div>
                        </Card>
                    ))}
                </Space>
            )}

            {/* Modal con los datos del emprendedor */}
            <Modal
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                styles={{
                    body: {
                        backgroundColor: "#002a5e",   // color de fondo del cuerpo del modal
                        color: "#7bb4e3",               // color del texto si querés
                        padding: 20                   // opcional
                    },
                    content: {
                        backgroundColor: "#002a5e"    // cambia el fondo del modal completo
                    }
                }}
            >
                {selectedEntrepreneur && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 20, }}>
                        <div style={{ fontSize: 26 }}><strong>{selectedEntrepreneur.nombreCompleto}</strong></div>
                        <div><strong>Edad:</strong> {selectedEntrepreneur.edad} años</div>
                        <div><strong>Teléfono:</strong> {selectedEntrepreneur.telefono}</div>
                        <div><strong>Propuestas:</strong> <EntrepreneurProposals _id={selectedEntrepreneur._id} /></div>
                    </div>
                )}
            </Modal>
        </>
    );
};
