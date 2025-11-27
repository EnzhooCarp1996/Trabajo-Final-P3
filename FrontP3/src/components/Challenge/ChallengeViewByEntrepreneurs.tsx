import { useProposal } from "../../hooks/Proposal/useProposal";
import type { IChallenge } from "../../types/types";
import { ProposalForm } from "../Proposal/ProposalForm";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useEffect, useRef, useState } from "react";
import { challengeService } from "../../services/ChallengeService";
import toast from "react-hot-toast";
import { Button, Carousel } from 'antd';
import type { CarouselRef } from "antd/es/carousel";
import { CalendarOutlined, PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import { CardEntity } from "../CardEntity";
import { ButtonNuevo } from "../ButtonNuevo";


export const ChallengesViewByEntrepreneurs: React.FC = () => {

    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const {
        formProposal,
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposal();
    const [loading, setLoading] = useState(false);
    const ref = useRef<CarouselRef>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const challengeActual = challenges[currentIndex] ?? null;

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ estado: ["activo"] });
                setChallenges(data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar los desafios");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <>

            {/* lista de desafíos */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            minHeight: "80vh", // <<✔ ahora sí se puede centrar verticalmente
                            padding: "20px 0",
                            flexDirection: "column"
                        }}
                    >

                        <div style={{ width: "100%", maxWidth: 700, minHeight: 300 }}>

                            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                                <Carousel
                                    dotPosition="bottom"
                                    draggable ref={ref}
                                    afterChange={(i) => setCurrentIndex(i)}
                                    style={{ width: "100%", height: "100%", }}
                                >
                                    {challenges.map((challenge) => (
                                        <div key={challenge._id} style={{ minHeight: 450, maxHeight: 450, overflowY: 'auto' }}>
                                            <CardEntity
                                                styles={{ minHeight: "40vh", backgroundColor: "#004f92" }}
                                                tituloBoton={"Propuesta"}
                                                iconoBoton={<PlusOutlined />}
                                                title={challenge.titulo}
                                                icon={<TrophyOutlined style={{ color: challenge.estado === "activo" ? "#1677ff" : "#aaa" }} />}
                                                borderColor={challenge.estado === "activo" ? "#52c41a" : "#db0101ff"}
                                            >
                                                <div style={{ fontSize: 24 }}>
                                                    {challenge.descripcion}
                                                </div>

                                                <div style={{ color: "#A3CEEF", fontSize: 20 }}>
                                                    <CalendarOutlined /> {new Date(challenge.createdAt).toLocaleDateString()}
                                                </div>

                                                <div style={{ color: "#A3CEEF", fontSize: 20 }}>
                                                    {challenge.empresaId.nombreEmpresa}
                                                </div>

                                            </CardEntity>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginTop: "16px", }}>
                                <Button onClick={() => ref.current?.prev()} >Anterior</Button>
                                <ButtonNuevo
                                    title={"Propuesta"}
                                    onClick={() => challengeActual && openModalProposal(challengeActual)}
                                    icon={<PlusOutlined />}
                                />
                                <Button onClick={() => ref.current?.next()} >Proximo</Button>
                            </div>
                        </div>
                        {/* Modal de creación de propuestas */}
                        <ModalGeneral
                            titulo={"Propuesta"}
                            isOpen={isModalProposalOpen}
                            onClose={closeModalProposal}
                            onOk={() => formProposal.submit()}
                            editing={!!editingProposal}
                        >
                            <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
                                <ProposalForm selectedChallenge={selectedChallenge} />
                            </FormGeneral>
                        </ModalGeneral>

                    </div>
                </>
            )}

        </>
    );
}


