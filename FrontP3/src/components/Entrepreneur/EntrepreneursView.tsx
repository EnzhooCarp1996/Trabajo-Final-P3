import type { Entrepreneur } from "../../types/types";
import { EntrepreneurForm } from "./EntrepreneurForm";
import { UserOutlined } from "@ant-design/icons";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { CardEntity } from "../CardEntity";
import { storage } from "../../storage";
import { GridRow } from "../GridRow";
import { Col, Form } from "antd";
import { useState } from "react";


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
            <HeaderEntity titulo="Emprendedores" onClick={() => openModal()} />

            {/* lista de emprendedores */}
            <GridRow>
                {entrepreneurs.map((entrepreneur) => (
                    <Col xs={24} sm={12} lg={8} key={entrepreneur.id}>
                        <CardEntity
                            title={entrepreneur.nombreCompleto}
                            icon={<UserOutlined />}
                            onEdit={() => openModal(entrepreneur)}
                            onDelete={() => handleDelete(entrepreneur.id)}
                        >
                            {getProposalCount(entrepreneur.id)} propuestas
                        </CardEntity>

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
