import type { ChallengeStatus, CreateChallengeRequest, IChallenge } from "../../../types/types";
import { challengeService } from "../../../services/ChallengeService";
import { ChallengeDescriptions } from "./ChallengeDescriptions";
import { ChallengeStatistics } from "./ChallengeStatistics";
import { Card, Form, List, message, Modal, Typography } from "antd";
import { useAuth } from "../../../context/Auth/useAuth";
import { TrophyOutlined } from "@ant-design/icons";
import { ChallengeForm } from "./ChallengeForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const { Title } = Typography;

export const ChallengesByProfile = () => {
    const { _id } = useAuth();
    const [formChallenge] = Form.useForm<CreateChallengeRequest>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<IChallenge | null>(null);
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);

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
    }, [_id]);



    const openModalChallenge = (challenge?: IChallenge) => {
        setEditingChallenge(challenge || null);
        setIsModalOpen(true);

        setTimeout(() => {
            if (challenge) {
                formChallenge.setFieldsValue({
                    titulo: challenge.titulo,
                    descripcion: challenge.descripcion,
                });
            } else {
                formChallenge.resetFields();
            }
        }, 0);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingChallenge(null);
    };

    const handleSubmitChallenge = async (values: CreateChallengeRequest) => {
        const isEdit = !!editingChallenge;

        Modal.confirm({
            title: isEdit ? "Actualizar desafío" : "Crear desafío",
            content: isEdit
                ? "¿Estás seguro de que querés guardar los cambios?"
                : "¿Estás seguro de que quieres crear este desafío?",
            okText: "Sí",
            cancelText: "No",
            onOk: async () => {
                try {
                    if (isEdit && editingChallenge) {
                        // Edición
                        const updatedChallenge = await challengeService.update(editingChallenge._id, values);
                        const updated = challenges.map((c) =>
                            c._id === editingChallenge._id ? updatedChallenge : c
                        );
                        setChallenges(updated);
                        message.success("Desafío actualizado correctamente");
                    } else {
                        // Creación
                        const newChallenge = await challengeService.create({
                            ...values,
                            empresaId: _id,
                        });
                        setChallenges(prev => [...prev, newChallenge]);
                        message.success("Desafío creado correctamente");
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
                    message.success("Desafio eliminado correctamente");
                } catch (error) {
                    console.error(error);
                    message.error("No se pudo eliminar el desafio");
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

    return (
        <div style={{ padding: '0 16px' }}>

            {/* Estadísticas y Botón */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
                padding: '16px 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <ChallengeStatistics challenges={challenges} openModal={openModalChallenge} />
            </div>

            {/* Lista de desafíos */}
            {loading ? (
                <Card style={{ textAlign: 'center', padding: 60, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)" }} >
                    <div style={{ color: '#8c8c8c', fontSize: 16 }}>
                        Cargando desafíos...
                    </div>
                </Card>
            ) : challenges.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 60, borderRadius: 12, border: '2px dashed #d9d9d9', backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <TrophyOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
                    <Title level={4} style={{ color: '#8c8c8c', marginBottom: 16 }}>
                        No hay desafíos creados
                    </Title>
                </Card>
            ) : (
                <>
                    <Card
                        style={{ borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)", boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: 'none', }}
                        styles={{ body: { padding: "8px 0", } }}
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
                                        openModal={openModalChallenge}
                                        handleDelete={handleDelete}
                                    />
                                </div>
                            )}
                        />
                    </Card>

                    {/* Modal de creación */}

                    <ChallengeForm
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        formSubmit={() => formChallenge.submit()}
                        editing={editingChallenge !== null}
                        form={formChallenge}
                        handleSubmit={handleSubmitChallenge}
                    />

                </>
            )}
        </div>
    );
};

