import type { ChallengeStatus, IChallenge } from "../../../types/types";
import { ChallengeList } from "./../ChallengeList";
import { ChallengeForm } from "./../ChallengeForm";
import { HeaderEntity } from "../../HeaderEntity";
import { ModalGeneral } from "../../ModalGeneral";
import { FormGeneral } from "../../FormGeneral";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import { challengeService } from "../../../services/ChallengeService";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/Auth/useAuth";
import { GridRow } from "../../GridRow";

interface ChallengesViewProps {
    readOnly?: boolean;
}

export const ChallengesById: React.FC<ChallengesViewProps> = ({ readOnly }) => {
    const { _id } = useAuth();
    const [formChallenge] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<IChallenge | null>(null);
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

    const toggleStatus = async (challenge: IChallenge) => {
        const nuevoEstado: ChallengeStatus = challenge.estado === "activo" ? "inactivo" : "activo";

        try {
            const updatedChallenge = await challengeService.update(challenge._id, { estado: nuevoEstado });

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
        <>
            {/* Encabezado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <HeaderEntity titulo="Desafíos" />
                <Button type="primary" onClick={() => openModal()}>
                    Nuevo
                </Button>
            </div>
            {/* onClick={() => openModal()} readOnly={readOnly} */}
            {/* lista de desafíos */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <GridRow>
                        {challenges.map((challenge, index) => (
                            <ChallengeList
                                key={index}
                                challenge={challenge}
                                toggleStatus={!readOnly ? toggleStatus : undefined}
                                openModal={!readOnly ? openModal : undefined}
                                handleDelete={!readOnly ? handleDelete : undefined}
                                readOnly={readOnly}
                            />
                        ))}
                    </GridRow>

                    {/* Modal de creación */}
                    {!readOnly && (
                        <ModalGeneral
                            titulo={"Desafio"}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onOk={() => formChallenge.submit()}
                            editing={!!editing}
                        >
                            <FormGeneral form={formChallenge} handleSubmit={handleSubmitChallenge}>
                                <ChallengeForm />
                            </FormGeneral>
                        </ModalGeneral>
                    )}
                </>
            )}
        </>
    );
}


