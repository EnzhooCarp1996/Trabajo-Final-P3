import { useState } from "react";
import { TrophyOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form } from "antd";
import type { Challenge, Company } from "../../types/types";
import { storage } from "../../storage";
import { FormGeneral } from "../FormGeneral";
import { HeaderEntidad } from "../HeaderEntidad";
import { ModalGeneral } from "../ModalGeneral";
import { ChallengeForm } from "./ChallengeForm";
import { GridRow } from "../GridRow";
import { EntidadCard } from "../CardEntidad";



export const ChallengesView = () => {
    const [challenges, setChallenges] = useState<Challenge[]>(storage.getChallenges());
    const [companies] = useState<Company[]>(storage.getCompanies());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    const [form] = Form.useForm();

    const openModal = (challenge?: Challenge) => {
        if (challenge) {
            setEditingChallenge(challenge);
            form.setFieldsValue(challenge);
        } else {
            setEditingChallenge(null);
            form.resetFields();
            if (companies.length > 0) form.setFieldsValue({ empresaId: companies[0].id, estado: "activo" });
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
        const company = companies.find(c => c.id === empresaId);
        return company ? company.nombreEmpresa : "Empresa desconocida";
    };

    return (
        <>
            {/* Encabezado */}
            <HeaderEntidad titulo="Desafíos" texto="Nuevo Desafío" onClick={() => openModal()} />

            {/* lista de desafíos */}
            <GridRow>
                {challenges.map((challenge) => (
                    <Col xs={24} sm={12} lg={8} key={challenge.id}>
                        <EntidadCard
                            title={challenge.titulo}
                            icon={<TrophyOutlined style={{ color: challenge.estado === "activo" ? "#1677ff" : "#aaa" }} />}
                            borderColor={challenge.estado === "activo" ? "#52c41a" : "#ccc"}
                            extraActions={[
                                <Button
                                    key="toggle"
                                    type="text"
                                    icon={challenge.estado === "activo" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                                    onClick={() => toggleStatus(challenge)}
                                />,
                            ]}
                            onEdit={() => openModal(challenge)}
                            onDelete={() => handleDelete(challenge.id)}
                        >
                            {challenge.descripcion}
                            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#91caff" }}>
                                <div><CalendarOutlined /> {new Date(challenge.fechaPublicacion).toLocaleDateString()}</div>
                                <div>{getCompanyName(challenge.empresaId)}</div>
                            </div>
                        </EntidadCard>

                    </Col>
                ))}
            </GridRow>

            {/* Modal de creación/edición */}
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
        </>
    );
}
