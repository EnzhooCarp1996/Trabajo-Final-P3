import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Form } from "antd";
import type { Entrepreneur } from "../../types/types";
import { storage } from "../../storage";
import { FormGeneral } from "../FormGeneral";
import { HeaderEntidad } from "../HeaderEntidad";
import { ModalGeneral } from "../ModalGeneral";
import { EntrepreneurForm } from "./EntrepreneurForm";
import { EntidadCard } from "../CardEntidad";
import { GridRow } from "../GridRow";


export const EntrepreneursView = () => {
    const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>(storage.getEntrepreneurs());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntrepreneur, setEditingEntrepreneur] = useState<Entrepreneur | null>(null);

    const [form] = Form.useForm();

    const openModal = (entrepreneur?: Entrepreneur) => {
        if (entrepreneur) {
            setEditingEntrepreneur(entrepreneur);
            form.setFieldsValue(entrepreneur);
        } else {
            setEditingEntrepreneur(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEntrepreneur(null);
    };

    const handleSubmit = (values: any) => {
        if (editingEntrepreneur) {
            const updated = entrepreneurs.map((e) =>
                e.id === editingEntrepreneur.id ? { ...e, ...values } : e
            );
            setEntrepreneurs(updated);
            storage.setEntrepreneurs(updated);
        } else {
            const newEntrepreneur: Entrepreneur = {
                id: storage.generateId(),
                usuarioId: storage.generateId(),
                ...values,
            };
            const updated = [...entrepreneurs, newEntrepreneur];
            setEntrepreneurs(updated);
            storage.setEntrepreneurs(updated);
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        const updated = entrepreneurs.filter((e) => e.id !== id);
        setEntrepreneurs(updated);
        storage.setEntrepreneurs(updated);
    };

    const getProposalCount = (entrepreneurId: string) => {
        const proposals = storage.getProposals();
        return proposals.filter((p) => p.emprendedorId === entrepreneurId).length;
    };

    return (
        <>
            {/* Encabezado */}
            <HeaderEntidad titulo="Propuestas" texto="Nueva Propuesta" onClick={() => openModal()} />

            {/* lista de emprendedores */}
            <GridRow>
                {entrepreneurs.map((entrepreneur) => (
                    <Col xs={24} sm={12} lg={8} key={entrepreneur.id}>
                        <EntidadCard
                            title={entrepreneur.nombreCompleto}
                            icon={<UserOutlined />}
                            onEdit={() => openModal(entrepreneur)}
                            onDelete={() => handleDelete(entrepreneur.id)}
                        >
                            {getProposalCount(entrepreneur.id)} propuestas
                        </EntidadCard>

                    </Col>
                ))}
            </GridRow>

            {/* Modal de creación/edición */}
            <ModalGeneral
                isOpen={isModalOpen}
                onClose={closeModal}
                onOk={() => form.submit()}
                editing={!!editingEntrepreneur}
            >
                <FormGeneral form={form} handleSubmit={handleSubmit}>
                    <EntrepreneurForm />
                </FormGeneral>
            </ModalGeneral>
        </>
    );
}
