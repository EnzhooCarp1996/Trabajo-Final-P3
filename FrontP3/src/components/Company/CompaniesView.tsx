import { useState } from "react";
import { GlobalOutlined, PhoneOutlined, BankOutlined } from "@ant-design/icons";
import { Col, Form } from "antd";
import type { Company } from "../../types/types";
import { storage } from "../../storage";
import { FormGeneral } from "../FormGeneral";
import { HeaderEntidad } from "../HeaderEntidad";
import { ModalGeneral } from "../ModalGeneral";
import { CompanyForm } from './CompanyForm';
import { EntidadCard } from "../CardEntidad";
import { GridRow } from "../GridRow";


export const CompaniesView = () => {
  const [companies, setCompanies] = useState<Company[]>(storage.getCompanies());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [form] = Form.useForm();

  const openModal = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      form.setFieldsValue(company);
    } else {
      setEditingCompany(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleSubmit = (values: any) => {
    if (editingCompany) {
      const updated = companies.map((c) =>
        c.id === editingCompany.id ? { ...c, ...values } : c
      );
      setCompanies(updated);
      storage.setCompanies(updated);
    } else {
      const newCompany: Company = {
        id: storage.generateId(),
        usuarioId: storage.generateId(),
        ...values,
      };
      const updated = [...companies, newCompany];
      setCompanies(updated);
      storage.setCompanies(updated);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    storage.setCompanies(updated);
  };

  return (
    <>
      {/* Encabezado */}
      <HeaderEntidad titulo="Empresas" texto="Nueva Empresa" onClick={() => openModal()} />

      {/* lista de empresas */}
      <GridRow>
        {companies.map((company) => (
          <Col xs={24} sm={12} lg={8} key={company.id}>
            <EntidadCard
              title={company.nombreEmpresa}
              icon={<BankOutlined />}
              onEdit={() => openModal(company)}
              onDelete={() => handleDelete(company.id)}
            >
              {company.descripcion}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                  <GlobalOutlined />{" "}
                  <a href={company.sitioWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#91caff" }}>
                    {company.sitioWeb}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                  <PhoneOutlined /> {company.telefono}
                </div>
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
        editing={!!editingCompany}
      >
        <FormGeneral form={form} handleSubmit={handleSubmit}>
          <CompanyForm />
        </FormGeneral>
      </ModalGeneral>
    </>
  );
}
