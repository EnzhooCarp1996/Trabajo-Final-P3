import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";
import { Card, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ProposalByEntrepreneur } from "../Proposal/ProposalById/ProposalByEntrepreneur";
import { ProfileModal } from "../UserProfile/ProfileModal";

export const EntrepreneurView = () => {
    const { view, entrepreneurs, loading, selectedEntrepreneur, isModalOpen, openModal, closeModal, setView } = useEntrepreneurView();

    if (view === "entrepreneurs") {
        return (
            <>
                {/* Lista */}
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <Space wrap size="large" style={{ width: "100%" }}>
                        {entrepreneurs.map((entrepreneur) => (
                            <Card
                                key={entrepreneur._id}
                                hoverable
                                onClick={() => openModal(entrepreneur)}
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    color: "white",
                                    border: `1px solid rgba(255,255,255,0.2)`,
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    width: 280,
                                    minHeight: 120,
                                }}
                                styles={{ body: { padding: "16px" } }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {/* Nombre */}
                                    <div>
                                        <div style={{ color: "white", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                                            {entrepreneur.nombreCompleto}
                                        </div>
                                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 4 }}>
                                            {entrepreneur.email}
                                        </div>
                                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>

                                        </div>
                                    </div>

                                    {/* Separador */}
                                    <div style={{
                                        height: "1px",
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        margin: "8px 0"
                                    }}></div>


                                </div>
                            </Card>
                        ))}
                    </Space>
                )}

                {/* Modal con los datos del emprendedor */}
                {selectedEntrepreneur && (
                    <ProfileModal
                        open={isModalOpen}
                        onClose={closeModal}
                        _id={selectedEntrepreneur._id}
                        setView={setView}
                    />
                )}
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

                <ProposalByEntrepreneur emprendedorId={selectedEntrepreneur._id} />
            </div>
        );
    }
}