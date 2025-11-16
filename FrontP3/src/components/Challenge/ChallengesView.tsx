import { useProposal } from "../../hooks/Proposal/useProposal";
import type { IChallenge, IUser } from "../../types/types";
import { ProposalForm } from "../Proposal/ProposalForm";
import { ChallengeList } from "./ChallengeList";
import { ChallengeForm } from "./ChallengeForm";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useParams } from "react-router-dom";
import { storage } from "../../storage";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { challengeService } from "../../services/ChallengeService";
import toast from "react-hot-toast";

interface ChallengesViewProps {
    readOnly?: boolean;
    showButtonNew?: boolean;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ readOnly, showButtonNew }) => {
    const [users] = useState<IUser[]>(storage.getUsers());
    const companies = users.filter(u => u.role === "empresa");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<IChallenge | null>(null);
    const [form] = Form.useForm();
    const params = useParams<{ empresaId: string }>();
    const currentCompanyId = params.empresaId;
    const {
        formProposal,
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposal();
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll("activo");
                setChallenges(data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar las empresas");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const allChallenges = challenges; // Todos los desafíos
    const companyChallenges = currentCompanyId
        ? challenges.filter(c => c.empresaId === currentCompanyId)
        : [];

    const openModal = (challenge?: IChallenge) => {
        if (challenge) {
            setEditingChallenge(challenge);
            form.setFieldsValue(challenge);
        } else {
            setEditingChallenge(null);
            form.resetFields();
            if (companies.length > 0) form.setFieldsValue({ empresaId: companies[0]._id, estado: "activo" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingChallenge(null);
    };

    const handleSubmit = (values: any) => {
        if (editingChallenge) {
            const updated = challenges.map((c) =>
                c._id === editingChallenge._id ? { ...c, ...values } : c
            );
            setChallenges(updated);
            storage.setChallenges(updated);
        } else {
            const newChallenge: IChallenge = {
                _id: storage.generateId(),
                createdAt: new Date().toISOString(),
                ...values,
            };
            const updated = [...challenges, newChallenge];
            setChallenges(updated);
            storage.setChallenges(updated);
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        const updated = challenges.filter((c) => c._id !== id);
        setChallenges(updated);
        storage.setChallenges(updated);
    };

    const toggleStatus = (challenge: IChallenge) => {
        const updated = challenges.map(c =>
            c._id === challenge._id
                ? { ...c, estado: c.estado === "activo" ? "inactivo" as const : 'activo' as const }
                : c
        );
        setChallenges(updated);
        storage.setChallenges(updated);
    };

    const getCompanyName = (empresaId: string) => {
        const company = companies.find(c => c._id === empresaId);
        return company ? company.nombreEmpresa : "Empresa desconocida";
    };

    return (
        <>
            {/* Encabezado */}
            <HeaderEntity titulo="Desafíos" />
            {/* onClick={() => openModal()} readOnly={readOnly} */}
            {/* lista de desafíos */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <ChallengeList
                        challenges={currentCompanyId ? companyChallenges : allChallenges}
                        getCompanyName={getCompanyName}
                        toggleStatus={!readOnly ? toggleStatus : undefined}
                        openModal={!readOnly ? openModal : undefined}
                        handleDelete={!readOnly ? handleDelete : undefined}
                        readOnly={readOnly}
                        showButtonNew={showButtonNew}
                        openModalProposal={(challenge) => openModalProposal(challenge, formProposal)}
                    />

                    {/* Modal de creación */}
                    {!readOnly && (
                        <ModalGeneral
                            titulo={"Desafio"}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onOk={() => form.submit()}
                            editing={!!editingChallenge}
                        >
                            <FormGeneral form={form} handleSubmit={handleSubmit}>
                                <ChallengeForm companies={companies} />
                            </FormGeneral>
                        </ModalGeneral>
                    )}
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
                </>
            )}
        </>
    );
}


