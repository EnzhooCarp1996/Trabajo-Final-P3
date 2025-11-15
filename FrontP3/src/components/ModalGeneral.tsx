import { Modal } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

interface ModalGeneralProps {
    titulo: string;
    isOpen: boolean;
    onClose: () => void;
    onOk: () => void;
    editing?: boolean;
    children: React.ReactNode;
}

export const ModalGeneral: React.FC<ModalGeneralProps> = ({
    titulo,
    isOpen,
    onClose,
    onOk,
    editing = false,
    children,
}) => {
    return (
        <Modal
            
            open={isOpen}
            onCancel={onClose}
            onOk={onOk}
            okText={editing ? "Actualizar" : "Crear"}
            cancelText="Cancelar"
            okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
        >
            <Title level={3} style={{ marginBottom: 16, color: "#1677ff" }}>{`${editing ? "Editar " : "Nuevo " } ${titulo}`}</Title>
            {children}
        </Modal>
    );
};

