import { BankOutlined, EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { IUser } from "../../types/types";
import { EntrepreneurForm } from "../Entrepreneur/EntrepreneurForm";
import { Card, Typography, Button, Form } from "antd";
import { CompanyForm } from "../Company/CompanyForm";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { storage } from "../../storage";
import { useState } from "react";

const { Title, Text } = Typography;

interface UserProfileProps {
    user: IUser;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const [currentUser, setCurrentUser] = useState<IUser>(user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = (values: Partial<IUser>) => {
        // actualizar estado local
        setCurrentUser(prev => {
            const updated = { ...prev, ...values } as IUser;
            // actualizar en storage
            storage.updateUser(updated);
            return updated;
        });

        // cerrar modal
        setIsModalOpen(false);
    };



    //---------------------------------------------------------------------------------------------------------------------


    const renderUserInfo = () => {
        if (currentUser.role === "empresa") {
            return (
                <Card
                    title="Información de la Empresa"
                    style={{ borderColor: "#01650bff", marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}

                >
                    <Text style={{ color: "#fff" }}>Nombre de la Empresa: {currentUser.nombreEmpresa}</Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Descripción: {currentUser.descripcion}</Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Sitio Web: <a href={currentUser.sitioWeb} target="_blank" style={{ color: "#91caff" }}>{currentUser.sitioWeb}</a></Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Teléfono: {currentUser.telefono}</Text>
                </Card>
            );
        } else {
            return (
                <Card
                    title="Información del Emprendedor"
                    style={{ borderColor: "#01650bff", marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                >
                    <Text style={{ color: "#fff" }}>Nombre Completo: {currentUser.nombreCompleto}</Text>
                </Card>
            );
        }
    };

    const openModal = () => {
        form.setFieldsValue(currentUser); // carga los datos actuales del usuario en el formulario
        setIsModalOpen(true);
    };

    const closeModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <>
            <HeaderEntity titulo="Perfil" readOnly />
            <div style={{ backgroundColor: "#0a1f44", borderRadius: "8px", width: "100%", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box", }}>

                {/*Información Básica del Usuario */}
                <Card
                    style={{ borderColor: "#089717ff", marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                    title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {user.role === "emprendedor" ? (<UserOutlined style={{ color: "#089717ff", marginRight: "28px", fontSize: "3em" }} />
                            ) : (
                                <BankOutlined style={{ marginRight: "28px", fontSize: "3em" }} />
                            )}
                            <div>
                                <Title level={3} style={{ color: "#fff" }}>{currentUser.role === "emprendedor" ? currentUser?.nombreCompleto : currentUser.nombreEmpresa}</Title>
                                <Text style={{ color: "#ccc" }}>@{user.email.split('@')[0]}</Text>
                            </div>
                        </div>
                    }
                    actions={[
                        <Button icon={<EditOutlined />} onClick={openModal} type="link">
                            Editar Perfil
                        </Button>,
                    ]}
                >
                    <div style={{ marginBottom: "12px" }}>
                        <Text style={{ color: "#ccc" }}>Fecha de Registro: {new Date(user.createdAt).toLocaleDateString()}</Text>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                        <Text style={{ color: "#ccc" }}>Estado: {user.activo ? "Activo" : "Inactivo"}</Text>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <Button icon={<MailOutlined />} type="link" href={`mailto:${user.email}`} target="_blank">
                            {user.email}
                        </Button>
                    </div>
                </Card>

                {/* Información de la Empresa o Emprendedor */}
                {renderUserInfo()}
            </div>

            <ModalGeneral
                isOpen={isModalOpen}
                onClose={closeModal}
                onOk={() => form.submit()}
            >
                <FormGeneral form={form} handleSubmit={handleSubmit}>
                    {currentUser.role === "empresa" ? <CompanyForm /> : <EntrepreneurForm />}
                </FormGeneral>
            </ModalGeneral>
        </>
    );
};

