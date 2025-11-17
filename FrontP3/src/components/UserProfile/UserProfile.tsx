import { BankOutlined, EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { IUser } from "../../types/types";
import { EntrepreneurForm } from "../Entrepreneur/EntrepreneurForm";
import { Card, Typography, Button, Form } from "antd";
import { CompanyForm } from "../Company/CompanyForm";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/useAuth";
import { userService, type CreateUserRequest } from "../../services/UserService";
import { ChallengeTable } from './../Challenge/ChallengeTable';
import { ProposalsSwiper } from "../Proposal/ProposalsSwiper";
import { FormGeneralItem } from "../FormGeneralItem";

const { Title, Text } = Typography;

export const UserProfile = () => {
    const { _id, role } = useAuth();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!_id) return;

        userService.getById(_id)
            .then((user) => setCurrentUser(user))
            .catch((err) => console.error("Error cargando usuario:", err));

    }, [_id]);

    const handleSubmit = async (values: CreateUserRequest) => {
        if (!currentUser?._id) {
            console.error("No se encontró el ID del usuario");
            return;
        }

        try {
            const updatedUser = await userService.update(currentUser._id, values);
            setCurrentUser(updatedUser);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error actualizando usuario", error);
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
            <HeaderEntity titulo="Perfil" />
            <div style={{ minHeight: "200px", overflowY: "auto" }}>
                <div style={{ backgroundColor: "#0a1f44", borderRadius: "8px", width: "100%", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box", }}>

                    {/*Información Básica del Usuario */}
                    <Card
                        style={{ borderColor: "#089717ff", marginBottom: "20px", backgroundColor: "#002140", color: "#fff" }}
                        title={
                            <div style={{ color: "#089717ff", display: "flex", alignItems: "center" }}>
                                {role === "emprendedor" ? (<UserOutlined style={{ marginRight: "28px", fontSize: "3em" }} />
                                ) : (
                                    <BankOutlined style={{ marginRight: "28px", fontSize: "3em" }} />
                                )}
                                <div>
                                    <Title style={{ color: "#ccc" }} level={3} >{role === "emprendedor" ? currentUser?.nombreCompleto : currentUser?.nombreEmpresa}</Title>

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
                            <Text style={{ color: "#ccc" }}>Fecha de Registro: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : ""}</Text>
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <Text style={{ color: "#ccc" }}>Telefono: {currentUser?.telefono}</Text>
                        </div>
                        <div style={{ marginBottom: "12px" }}>
                            <Text style={{ color: "#ccc" }}>Email <MailOutlined />: {currentUser?.email}</Text>
                        </div>

                        {role === "emprendedor" ? (
                            <div style={{ marginBottom: "12px" }}>
                                <Text style={{ color: "#ccc" }}>Edad: {currentUser?.edad}</Text>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: "12px" }}>
                                    <Text style={{ color: "#fff" }}>Sitio Web: <a href={currentUser?.sitioWeb} target="_blank" style={{ color: "#91caff" }}>{currentUser?.sitioWeb}</a></Text>
                                </div>
                                <div style={{ marginBottom: "12px" }}>
                                    <Text style={{ color: "#fff" }}>Descripción: {currentUser?.descripcion}</Text>
                                </div>
                            </>
                        )}
                        <div style={{ marginBottom: "12px" }}>
                            <Text style={{ color: "#ccc" }}>Estado: {currentUser?.activo ? "Activo" : "Inactivo"}</Text>
                        </div>
                    </Card>
                </div >
                <Title style={{ textAlign: "center" }} level={3} >Mis {role === "emprendedor" ? "Propuestas" : "Desafios"}</Title>

                {role === "emprendedor" ? (
                    <ProposalsSwiper />
                ) : (
                    <ChallengeTable />
                )}

                <ModalGeneral
                    titulo={"Usuario"}
                    isOpen={isModalOpen}
                    editing={true}
                    onClose={closeModal}
                    onOk={() => form.submit()}
                >
                    <FormGeneral form={form} handleSubmit={handleSubmit}>
                        {role === "empresa" ? <CompanyForm /> : <EntrepreneurForm />}
                        <FormGeneralItem form={form} />
                    </FormGeneral>
                </ModalGeneral>
            </div>
        </>
    );
};

