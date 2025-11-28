import { Modal, Avatar, Button, Card } from "antd";
import { useEffect, useState } from "react";
import { userService } from "../../services/UserService";
import type { IUser } from "../../types/types";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { EntrepreneurProposals } from "../Entrepreneur/EntrepreneurProposals";
import { useAuth } from "../../context/Auth/useAuth";

interface ProfileModalProps {
    _id: string;
    open: boolean;
    onClose: () => void;
    setView: React.Dispatch<React.SetStateAction<"entrepreneurs" | "proposals">>;
}

export const ProfileModal = ({ _id, open, onClose, setView }: ProfileModalProps) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const { role } = useAuth()
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
            styles={{
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
                                    onClick={() => setView("proposals")}
                                >
                                    Propuestas:
                                </strong>
                                <EntrepreneurProposals _id={_id} />
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </Modal>
    );
};
