import { Modal } from "antd";

interface ModalGeneralProps {
    isOpen: boolean;
    onClose: () => void;
    onOk: () => void;
    editing?: boolean;
    children: React.ReactNode;
}

export const ModalGeneral: React.FC<ModalGeneralProps> = ({
    isOpen,
    onClose,
    onOk,
    editing = false,
    children,
}) => {
    return (
        <Modal
            title={editing ? "Editar" : "Nuevo"}
            open={isOpen}
            onCancel={onClose}
            onOk={onOk}
            okText={editing ? "Actualizar" : "Crear"}
            cancelText="Cancelar"
            okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
        >
            {children}
        </Modal>
    );
};

