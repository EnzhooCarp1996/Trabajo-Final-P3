import { BankOutlined, EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { Company, Entrepreneur, User } from "../../types/types";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

interface UserProfileProps {
    user: User;
    company?: Company;
    entrepreneur?: Entrepreneur;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, company, entrepreneur }) => {
    const renderCompanyInfo = () => {
        if (company) {
            return (
                <Card
                    title="Información de la Empresa"
                    style={{ marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                >
                    <Text style={{ color: "#fff" }}>Nombre de la Empresa: {company.nombreEmpresa}</Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Descripción: {company.descripcion}</Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Sitio Web: <a href={company.sitioWeb} target="_blank" style={{ color: "#91caff" }}>{company.sitioWeb}</a></Text>
                    <br />
                    <Text style={{ color: "#fff" }}>Teléfono: {company.telefono}</Text>
                </Card>
            );
        }
        return null;
    };

    const renderEntrepreneurInfo = () => {
        if (entrepreneur) {
            return (
                <Card
                    title="Información del Emprendedor"
                    style={{ marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                >
                    <Text style={{ color: "#fff" }}>Nombre Completo: {entrepreneur.nombreCompleto}</Text>
                </Card>
            );
        }
        return null;
    };

    return (
        <div style={{

            backgroundColor: "#0a1f44",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            boxSizing: "border-box",
        }}>
            {/*Información Básica del Usuario */}
            <Card
                style={{ marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {user.tipoUsuario === "emprendedor" ? (<UserOutlined style={{ marginRight: "28px", fontSize: "3em" }} />
                        ) : (
                            <BankOutlined style={{ marginRight: "28px", fontSize: "3em" }} />
                        )}
                        <div>
                            <Title level={3} style={{ color: "#fff" }}>{entrepreneur?.nombreCompleto}</Title>
                            <Text style={{ color: "#ccc" }}>@{user.email.split('@')[0]}</Text>
                        </div>
                    </div>
                }
                actions={[
                    <Button icon={<EditOutlined />} type="link">
                        Editar Perfil
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: "12px" }}>
                    <Text style={{ color: "#ccc" }}>Fecha de Registro: {new Date(user.fechaRegistro).toLocaleDateString()}</Text>
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
            {user.tipoUsuario === "emprendedor" ?
                (
                    renderEntrepreneurInfo()
                ) : (
                    renderCompanyInfo()
                )}
        </div>
    );
};

