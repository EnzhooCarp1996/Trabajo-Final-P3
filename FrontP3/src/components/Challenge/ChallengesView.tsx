import { useProposalView } from "../../hooks/Proposal/useProposalView";
import type { Challenge, IUser } from "../../types/types";
import { ProposalForm } from "../Proposal/ProposalForm";
import { ChallengeList } from "./ChallengeList";
import { ChallengeForm } from "./ChallengeForm";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useParams } from "react-router-dom";
import { storage } from "../../storage";
import { useState } from "react";
import { Form } from "antd";

interface ChallengesViewProps {
    readOnly?: boolean;
    showButtonNew?: boolean;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ readOnly, showButtonNew }) => {
    const [users] = useState<IUser[]>(storage.getUsers());
    const companies = users.filter(u => u.role === "empresa");
    const entrepreneurs = users.filter(u => u.role === "emprendedor");
    const [challenges, setChallenges] = useState<Challenge[]>(storage.getChallenges());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
    const [form] = Form.useForm();
    const params = useParams<{ empresaId: string }>();
    const currentCompanyId = params.empresaId;
    const formProposal = Form.useForm()[0];
    const {
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposalView();

    const allChallenges = challenges; // Todos los desafíos
    const companyChallenges = currentCompanyId
        ? challenges.filter(c => c.empresaId === currentCompanyId)
        : [];

    const openModal = (challenge?: Challenge) => {
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
                c.id === editingChallenge.id ? { ...c, ...values } : c
            );
            setChallenges(updated);
            storage.setChallenges(updated);
        } else {
            const newChallenge: Challenge = {
                id: storage.generateId(),
                fechaPublicacion: new Date().toISOString(),
                ...values,
            };
            const updated = [...challenges, newChallenge];
            setChallenges(updated);
            storage.setChallenges(updated);
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        const updated = challenges.filter((c) => c.id !== id);
        setChallenges(updated);
        storage.setChallenges(updated);
    };

    const toggleStatus = (challenge: Challenge) => {
        const updated = challenges.map(c =>
            c.id === challenge.id
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
            <HeaderEntity titulo="Desafíos" onClick={() => openModal()} readOnly={readOnly} />

            {/* lista de desafíos */}
            <ChallengeList
                challenges={currentCompanyId ? companyChallenges : allChallenges}
                getCompanyName={getCompanyName}
                toggleStatus={!readOnly ? toggleStatus : undefined}
                openModal={!readOnly ? openModal : undefined}
                handleDelete={!readOnly ? handleDelete : undefined}
                readOnly={readOnly}
                showButtonNew={showButtonNew}
                openModalProposal={(challenge) => openModalProposal(undefined, challenge, formProposal)}
            />

            {/* Modal de creación/edición */}
            {!readOnly && (
                <ModalGeneral
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
                isOpen={isModalProposalOpen}
                onClose={closeModalProposal}
                onOk={() => formProposal.submit()}
                editing={!!editingProposal}
            >
                <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
                    <ProposalForm challenges={challenges} entrepreneurs={entrepreneurs as IUser[]} selectedChallenge={selectedChallenge} />
                </FormGeneral>
            </ModalGeneral>
        </>
    );
}
