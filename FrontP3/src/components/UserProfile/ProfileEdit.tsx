import { userService, type CreateUserRequest } from "../../services/UserService";
import { EntrepreneurForm } from "../Entrepreneur/EntrepreneurForm";
import { Button, Form, message, Typography } from "antd";
import { FormGeneralItem } from "../FormGeneralItem";
import { CompanyForm } from "../Company/CompanyForm";
import { useAuth } from "../../context/Auth/useAuth";
import type { IUser } from "../../types/types";
import { HeaderReturn } from "../HeaderReturn";
import { useNavigate } from "react-router-dom";
import { FormGeneral } from "../FormGeneral";
import { useEffect, useState } from "react";

const { Title } = Typography;

export const ProfileEdit = () => {
    const { _id, role } = useAuth();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();


    useEffect(() => {
        const loadUser = async () => {
            if (!_id) return;

            try {
                const user = await userService.getById(_id);
                setCurrentUser(user);

                form.setFieldsValue(user);

            } catch (error) {
                console.error("Error cargando usuario:", error);
            }
        };

        loadUser();
    }, [_id, form]);

    const handleSubmit = async (values: CreateUserRequest) => {
        setLoading(true);
        if (!currentUser?._id) {
            console.error("No se encontró el ID del usuario");
            return;
        }

        // Evitar enviar pass vacía
        if (!values.password) {
            delete (values as any).password;
            delete (values as any).confirmPassword;
        }

        try {
            const updatedUser = await userService.update(currentUser._id, values);
            setCurrentUser(updatedUser);
            message.success("Perfil actualizado correctamente");
            navigate("/UserProfile");
        } catch (error) {
            console.error("Error actualizando usuario", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderReturn titulo={"Editar Perfil"} />

            <div
                style={{
                    width: "100%",
                    maxWidth: "550px",
                    margin: "0 auto",
                    padding: "16px",
                    background: "#102a43",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",

                    // 🔥 Ajuste responsivo
                    boxSizing: "border-box",
                }}
            >
                <Title level={4} style={{ color: "#ccc", margin: "5px" }}>
                    Editar Perfil
                </Title>

                <FormGeneral form={form} handleSubmit={handleSubmit}>
                    {role === "empresa" ? <CompanyForm /> : <EntrepreneurForm />}
                    <FormGeneralItem form={form} requirePassword={false} />
                    <div
                        style={{
                            marginTop: "24px",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >
                        <Button
                            onClick={() => navigate(-1)}
                            style={{
                                backgroundColor: "#334e68",
                                color: "white",
                                borderColor: "#334e68",
                                padding: "6px 16px",
                                borderRadius: "6px",
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                padding: "6px 16px",
                                borderRadius: "6px",
                            }}
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </FormGeneral>
            </div>

        </>
    );
};
