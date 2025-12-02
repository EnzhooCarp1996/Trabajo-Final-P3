import { CalendarOutlined, PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import { challengeService } from "../../../services/ChallengeService";
import type { IChallenge, ICompanyRef } from "../../../types/types";
import { useProposal } from "../../../hooks/Proposal/useProposal";
import { ProposalForm } from "../../Proposal/ProposalForm";
import { CompanyModal } from "../../Company/CompanyModal";
import { Button, Card, Carousel, Typography } from 'antd';
import { useEffect, useRef, useState } from "react";
import type { CarouselRef } from "antd/es/carousel";
import { ModalGeneral } from "../../ModalGeneral";
import { FormGeneral } from "../../FormGeneral";
import { ButtonNuevo } from "../../ButtonNuevo";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const ChallengesToEntrepreneurs: React.FC = () => {

    const navigate = useNavigate();
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
    const initial = Number(localStorage.getItem("challengeIndex") ?? 0);
    const [currentIndex, setCurrentIndex] = useState(initial);
    const challengeActual = challenges[currentIndex] ?? null;

    const [selectedCompany, setSelectedCompany] = useState<ICompanyRef | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (_id: ICompanyRef) => {
        setSelectedCompany(_id);
        setIsModalOpen(true);
    };

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
                            display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
                            minHeight: "80vh", padding: "20px 0", flexDirection: "column"
                        }}
                    >

                        <div style={{ width: "100%", maxWidth: 700, minHeight: 300 }}>

                            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                                <Carousel
                                    dotPosition="bottom"
                                    draggable ref={ref}
                                    initialSlide={currentIndex}
                                    afterChange={(i) => setCurrentIndex(i)}
                                    style={{ width: "100%", height: "100%", }}
                                >
                                    {challenges.map((challenge, index) => (
                                        <div key={challenge._id} style={{ minHeight: 450, maxHeight: 450, overflowY: 'auto' }}>

                                            <Card
                                                title={
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", }}>
                                                        <span style={{ color: "white", display: "flex", alignItems: "center", gap: 8 }}>
                                                            <TrophyOutlined style={{ color: "#1677ff" }} />
                                                            <h3 style={{ color: "#69b1ff", marginTop: 20, }}>{challenge.titulo}</h3>
                                                        </span>
                                                        <h3
                                                            style={{ color: "#69b1ff", marginTop: 20, cursor: "pointer", textDecoration: "underline", }}
                                                            onClick={() => {
                                                                localStorage.setItem("challengeIndex", String(index));
                                                                navigate(`/proposals/challenge/${challenge._id}`);
                                                            }}
                                                        >
                                                            Ver Sus Propuestas
                                                        </h3>

                                                    </div>
                                                }
                                                style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid #52c41a", borderRadius: 12, minHeight: "40vh", backgroundColor: "#004f92" }}
                                            >
                                                <Text style={{ color: "#ccc" }}>

                                                    <div style={{ fontSize: 24 }}>{challenge.descripcion} </div>

                                                    <div style={{ color: "#A3CEEF", fontSize: 20 }}>
                                                        <CalendarOutlined /> {new Date(challenge.createdAt).toLocaleDateString()}
                                                    </div>

                                                    <div
                                                        onClick={() => openModal(challenge.empresaId)}
                                                        style={{
                                                            display: "flex", alignItems: "center", gap: 4,
                                                            cursor: "pointer", textDecoration: "underline", color: "#69b1ff",
                                                        }}
                                                    >
                                                        {challenge.empresaId.nombreEmpresa}
                                                    </div>

                                                </Text>
                                            </Card>
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
                            titulo={"Nueva Propuesta"}
                            isOpen={isModalProposalOpen}
                            onClose={closeModalProposal}
                            onOk={() => formProposal.submit()}
                            editing={!!editingProposal}
                        >
                            <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
                                <ProposalForm selectedChallenge={selectedChallenge} />
                            </FormGeneral>
                        </ModalGeneral>

                        {/* MODAL DETALLES */}
                        {selectedCompany &&
                            <CompanyModal
                                open={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                _id={selectedCompany._id}
                            />
                        }

                    </div >
                </>
            )}

        </>
    );
};





