import { Modal, Input, Button } from "antd";
import { MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { notificationService } from "../../services/NotificationService";
import { useState } from "react";
import { useAuth } from "../../context/Auth/useAuth";

interface EnviarMensajeProps {
    emprendendedorId: string;
}

export const EnviarMensaje: React.FC<EnviarMensajeProps> = ({ emprendendedorId }) => {
    const { _id } = useAuth();
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const abrirModal = () => setOpen(true);
    const cerrarModal = () => setOpen(false);

    const handleEnviarMensaje = async () => {
        if (!emprendendedorId) return;

        try {
            await notificationService.create({
                fromUserId: _id,
                toUserId: emprendendedorId,
                contenido: mensaje,
                createdAt: new Date(),
                visto: false
            });

            toast.success("Mensaje enviado");
            setMensaje("");
            cerrarModal();
        } catch (err) {
            console.error(err);
            toast.error("Error al enviar mensaje");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                onClick={abrirModal}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#4f46e5",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "12px",
                    padding: "12px 24px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "0.3s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
                <MessageCircle size={18} /> Enviar mensaje
            </Button>

            <Modal
                open={open}
                onCancel={cerrarModal}
                footer={null}
                closeIcon={<span style={{ color: "red", fontSize: 20 }}>✕</span>}
                centered
                style={{maxWidth: "90vw"}}
                styles={{
                    header: { maxWidth: "90vw",background: "#0b1a2e", color: "white", borderBottom: "1px solid #1677ff" },
                    body: { maxWidth: "90vw", background: "#0d1117", color: "white", padding: "24px" },
                    content: { maxWidth: "90vw", background: "#0d1117", borderRadius: "12px", border: "1px solid #1677ff", boxShadow: "0 0 12px rgba(22, 119, 255, 0.4)" }
                }}
            >
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            textAlign: "center",
                            marginBottom: "8px"
                        }}
                    >
                        Enviar mensaje
                    </h2>

                    <Input.TextArea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        rows={5}
                        placeholder="Escribe tu mensaje..."
                        style={{
                            borderRadius: "10px",
                            padding: "12px",
                            border: "1px solid #d1d5db",
                            resize: "none"
                        }}
                    />

                    <Button
                        onClick={handleEnviarMensaje}
                        style={{
                            backgroundColor: "#4f46e5",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "10px",
                            padding: "10px",
                            width: "100%",
                            transition: "0.3s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
                    >
                        Enviar
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
