import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";
import { EntrepreneurProfile } from "./EntrepreneurProfile";
import { EntrepreneursList } from "./EntrepreneursList";
import { Space } from "antd";

export const EntrepreneurView = () => {
    const { entrepreneurs, loading, selectedEntrepreneur, isModalOpen, openModal, closeModal } = useEntrepreneurView();

        return (
            <>
                {/* Lista */}
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <Space wrap size="large" style={{ width: "100%" }}>
                        {entrepreneurs.map((entrepreneur) => (
                            <EntrepreneursList 
                            entrepreneur={entrepreneur}
                            openModal={openModal}
                            />
                        ))}
                    </Space>
                )}

                {/* Modal con los datos del emprendedor */}
                {selectedEntrepreneur && (
                    <EntrepreneurProfile
                        open={isModalOpen}
                        onClose={closeModal}
                        _id={selectedEntrepreneur._id}
                        
                    />
                )}
            </>
        );
    };
