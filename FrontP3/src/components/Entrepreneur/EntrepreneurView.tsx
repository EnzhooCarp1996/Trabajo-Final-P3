import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";
import { Card, Space, Modal } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { EntrepreneurProposals } from "./EntrepreneurProposals";
import { ProposalTable } from "../Proposal/ProposalById/ProposalTable";

export const EntrepreneurView = () => {
    const { view, entrepreneurs, loading, selectedEntrepreneur, isModalOpen, openModal, closeModal, setView } = useEntrepreneurView();
    if (view === "entrepreneurs") {
        return (
            <>

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
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 18, }}>
                            <div style={{ fontSize: 20 }}><strong>{selectedEntrepreneur.nombreCompleto}</strong></div>
                            <div><strong>Edad:</strong> {selectedEntrepreneur.edad} años</div>
                            <div><strong>Teléfono:</strong> {selectedEntrepreneur.telefono}</div>
                            <div>
                                <strong
                                    style={{
                                        color: "#69b1ff",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setView("proposals")}
                                >
                                    Propuestas:
                                </strong>
                                <EntrepreneurProposals _id={selectedEntrepreneur._id} />
                            </div>
                        </div>
                    )}
                </Modal>
            </>
        );
    };
    if (view === "proposals" && selectedEntrepreneur) {
        return (
            <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 12 }}>
                    <div onClick={() => setView("entrepreneurs")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, }}>
                        <ArrowLeftOutlined style={{ fontSize: 18, color: "white" }} />
                        <span style={{ color: "white" }}>Volver</span>
                    </div>

                    <span style={{ color: "white", opacity: 0.6 }}>{">"}</span>
                    <span style={{ color: "white", fontSize: 18 }}>{selectedEntrepreneur.nombreCompleto}</span>
                </div>

                <ProposalTable emprendedorId={selectedEntrepreneur._id} />
            </div>
        );
    }
}

