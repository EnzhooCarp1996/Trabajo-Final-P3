import { ProposalsToModal } from "../Proposal/ProposalsToModal";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { userService } from "../../services/UserService";
import { useAuth } from "../../context/Auth/useAuth";
import { Modal, Avatar, Button, Card } from "antd";
import type { IUser } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface EntrepreneurProfileProps {
    _id: string;
    open: boolean;
    onClose: () => void;
}

export const EntrepreneurProfile = ({ _id, open, onClose }: EntrepreneurProfileProps) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const { role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!_id) return;

        userService.getById(_id)
            .then((user) => setCurrentUser(user))
            .catch((err) => console.error("Error cargando usuario:", err));
    }, [_id]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={800}
            closeIcon={<span style={{ color: "red", fontSize: 20 }}>✕</span>}
            styles={{
                mask: { background: "rgba(0,0,0,0.5)" },
                content: { background: "rgba(0,0,0,0.75)" },
                body: { padding: 0, background: "rgba(0,0,0,0.75)" }
            }}
        >

            {/* Contenedor general */}
            <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", color: "white" }} >
                {/* 🔵 Banner */}
                <div style={{ width: "100%", height: 100, background: "linear-gradient(90deg, #006ac2, #003f78)", position: "relative" }}>

                </div>

                {/* Contenido */}
                <div style={{ padding: "40px 30px" }}>
                    {/* Foto + Títulos */}
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: -60 }} >
                        <Avatar
                            size={120}
                            icon={currentUser?.role.nombre === "empresa" ? <BankOutlined /> : <UserOutlined />}
                            style={{ border: "4px solid white", background: "#1677ff" }}
                        />

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h1 style={{ margin: 0, fontSize: 26 }}>
                                {currentUser?.role.nombre === "emprendedor" ? currentUser?.nombreCompleto : currentUser?.nombreEmpresa}
                            </h1>
                            {currentUser?.role.nombre === "emprendedor" ? (
                                <>
                                    <span style={{ margin: 0, fontSize: 16 }}>{currentUser?.email}</span>
                                    <span>{currentUser?.edad} años</span>
                                </>
                            ) : (
                                <span style={{ margin: 0, fontSize: 16 }}>{currentUser?.sitioWeb}</span>
                            )}
                        </div>
                        {role === "empresa" ?
                            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                                <Button type="primary" style={{ backgroundColor: "#1677ff", borderRadius: 6 }} >
                                    Enviar mensaje
                                </Button>
                            </div>
                            :
                            <></>
                        }

                    </div>


                    {/* Descripción */}
                    <div style={{ marginTop: 30, color: "#c7e1ff", fontSize: 16 }}>
                        <p>{currentUser?.descripcion}</p>
                    </div>

                    {/* Tarjetas de información */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20, justifyContent: "center" }} >
                        <Card style={{ width: "80%", borderRadius: 12, backgroundColor: "#004f92", color: "white", border: "1px solid #005fb1" }} >
                            <div>
                                <strong
                                    style={{ color: "#69b1ff", textDecoration: "underline", cursor: "pointer" }}
                                    onClick={() => navigate(`/proposals/entrepreneur/${_id}`)}
                                >
                                    Propuestas:
                                </strong>
                                <ProposalsToModal _id={_id} />
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </Modal>
    );
};
