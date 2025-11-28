import type { ChallengeStatus, IChallenge } from "../../../types/types";
import { challengeService } from "../../../services/ChallengeService";
import { ChallengeDescriptions } from "./ChallengeDescriptions";
import { useAuth } from "../../../context/Auth/useAuth";
import { Card, Form, List, Modal, Typography } from "antd";
import { ChallengeForm } from "./ChallengeForm";
import { HeaderReturn } from "../../HeaderReturn";
import { ModalGeneral } from "../../ModalGeneral";
import { ArrowLeftOutlined, TrophyOutlined } from "@ant-design/icons";
import { FormGeneral } from "../../FormGeneral";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChallengeStatistics } from "./ChallengeStatistics";
import { ProposalByChallenge } from "../../Proposal/ProposalById/ProposalByChallenge";

const { Title } = Typography;

export const ChallengesByProfile: React.FC = () => {
    const { _id } = useAuth();
    const [formChallenge] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<IChallenge | null>(null);
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<"challenges" | "proposals">("challenges");
    const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ empresaId: _id });
                setChallenges(data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar tus desafios");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);



    const openModal = (challenge?: IChallenge) => {
        if (challenge) {
            // Edición
            setEditing(challenge);
            formChallenge.setFieldsValue(challenge);
        } else {
            // Creación
            setEditing(null);
            formChallenge.resetFields();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditing(null);
    };

    const handleSubmitChallenge = async (values: any) => {
        const isEdit = !!editing;

        Modal.confirm({
            title: isEdit ? "Actualizar desafío" : "Crear desafío",
            content: isEdit
                ? "¿Estás seguro de que querés guardar los cambios?"
                : "¿Estás seguro de que quieres crear este desafío?",
            okText: "Sí",
            cancelText: "No",
            onOk: async () => {
                try {
                    if (isEdit && editing) {
                        // Edición
                        const updatedChallenge = await challengeService.update(editing._id, values);
                        const updated = challenges.map((c) =>
                            c._id === editing._id ? updatedChallenge : c
                        );
                        setChallenges(updated);
                        toast.success("Desafío actualizado correctamente");
                    } else {
                        // Creación
                        const newChallenge = await challengeService.create({
                            ...values,
                            empresaId: _id,
                        });
                        setChallenges(prev => [...prev, newChallenge]);
                        toast.success("Desafío creado correctamente");
                    }
                    closeModal();
                } catch (error) {
                    console.error("Error al guardar el desafío", error);
                    toast.error("No se pudo guardar el desafío");
                }
            },
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Eliminar desafio",
            content: "¿Estás seguro de que querés eliminar este desafio?",
            okText: "Sí",
            cancelText: "No",
            onOk: async () => {
                try {
                    await challengeService.delete(id);
                    setChallenges(challenges.filter((c) => c._id !== id));
                    toast.success("Desafio eliminado correctamente");
                } catch (error) {
                    console.error(error);
                    toast.error("No se pudo eliminar el desafio");
                }
            },
        });
    };

    const toggleStatus = async (challenge: IChallenge, newEstado: ChallengeStatus) => {
        try {
            const updatedChallenge = await challengeService.update(challenge._id, { estado: newEstado });

            setChallenges(prev =>
                prev.map(c => (c._id === updatedChallenge._id ? updatedChallenge : c))
            );

            toast.success(`Desafío "${updatedChallenge.titulo}" actualizado a ${updatedChallenge.estado}`);
        } catch (error) {
            console.error("Error al actualizar el estado del desafío", error);
            toast.error("No se pudo actualizar el estado del desafío");
        }
    };

    if (view === "challenges") {
        return (
            <div style={{ padding: '0 16px' }}>
                {/* Encabezado */}
                <HeaderReturn titulo={"Mis Desafíos"} />

                {/* Estadísticas y Botón */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    padding: '16px 24px',
                    backgroundColor: '#213ac4',
                    borderRadius: 12,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <ChallengeStatistics challenges={challenges} openModal={openModal} />
                </div>

                {/* Lista de desafíos */}
                {loading ? (
                    <Card style={{ textAlign: 'center', padding: 60, borderRadius: 12, backgroundColor: '#fafafa' }} >
                        <div style={{ color: '#8c8c8c', fontSize: 16 }}>
                            Cargando desafíos...
                        </div>
                    </Card>
                ) : challenges.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: 60, borderRadius: 12, border: '2px dashed #d9d9d9' }}>
                        <TrophyOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
                        <Title level={4} style={{ color: '#8c8c8c', marginBottom: 16 }}>
                            No hay desafíos creados
                        </Title>
                    </Card>
                ) : (
                    <>
                        <Card
                            style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: 'none', maxHeight: "60vh", overflowY: "auto" }}
                            styles={{ body: { padding: "8px 0", backgroundColor: '#213ac4', } }}
                        >
                            <List
                                style={{ backgroundColor: 'transparent' }}
                                dataSource={challenges}
                                renderItem={(challenge) => (
                                    <div style={{ margin: '8px 16px', backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        <ChallengeDescriptions
                                            key={challenge._id}
                                            challenge={challenge}
                                            toggleStatus={toggleStatus}
                                            openModal={openModal}
                                            handleDelete={handleDelete}
                                            setView={setView}
                                            setSelectedChallenge={setSelectedChallenge}
                                        />
                                    </div>
                                )}
                            />
                        </Card>

                        {/* Modal de creación */}
                        <ModalGeneral
                            titulo={editing ? "Desafío" : "Nuevo Desafío"}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onOk={() => formChallenge.submit()}
                            editing={!!editing}
                        >
                            <FormGeneral form={formChallenge} handleSubmit={handleSubmitChallenge}>
                                <ChallengeForm />
                            </FormGeneral>
                        </ModalGeneral>
                    </>
                )}
            </div>
        );
    };

    if (view === "proposals" && selectedChallenge) {
        return (
            <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 12 }}>
                    <div onClick={() => setView("challenges")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, }}>
                        <ArrowLeftOutlined style={{ fontSize: 18, color: "white" }} />
                        <span style={{ color: "white" }}>Volver</span>
                    </div>

                    <span style={{ color: "white", opacity: 0.6 }}>{">"}</span>
                    <span style={{ color: "white", fontSize: 18 }}>Mis Desafíos</span>
                    <span style={{ color: "white", opacity: 0.6 }}>{">"}</span>
                    <span style={{ color: "white", fontSize: 18 }}>{selectedChallenge.titulo}</span>
                </div>

                <ProposalByChallenge desafioId={selectedChallenge._id} />
            </div>
        );
    }
};