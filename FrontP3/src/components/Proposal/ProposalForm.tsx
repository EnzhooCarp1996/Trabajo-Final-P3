
import { Form, Input, Typography } from "antd";
import type { IChallengeRef } from "../../types/types";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";

const { Title } = Typography;

interface ProposalFormProps {
    titulo: string;
    selectedChallenge: IChallengeRef | null;
    isModalOpen: boolean;
    closeModal: () => void;
    formSubmit: () => void;
    editing?: boolean;
    form: any;
    handleSubmit: (values: any) => void;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({ titulo, selectedChallenge, isModalOpen, closeModal, formSubmit, editing, form, handleSubmit }) => {

    return (
            <ModalGeneral
                titulo={titulo}
                isOpen={isModalOpen}
                onClose={closeModal}
                onOk={formSubmit}
                editing={editing}
            >
                <FormGeneral form={form} handleSubmit={handleSubmit}>


                    <Title level={3} style={{ color: "#69b1ff" }}>{selectedChallenge?.titulo}</Title>

                    <Form.Item
                        name="tituloPropuesta"
                        label={<span style={{ color: "#69b1ff" }}>Título de la Propuesta</span>}
                        rules={[
                            { required: true, message: "El título es obligatorio" },
                            { min: 5, message: "El título debe tener al menos 5 caracteres" },
                            { max: 100, message: "El título no puede superar los 100 caracteres" },
                        ]}
                    >
                        <Input placeholder="Ingrese el título de la propuesta aqui" />
                    </Form.Item>

                    <Form.Item
                        name="descripcion"
                        label={<span style={{ color: "#69b1ff" }}>Descripción</span>}
                        rules={[
                            { required: true, message: "La descripción es obligatoria" },
                            { min: 10, message: "La descripción debe tener al menos 10 caracteres" },
                            { max: 500, message: "La descripción no puede superar los 500 caracteres" },
                        ]}
                    >
                        <Input.TextArea rows={3} placeholder="Ingrese la descripción de la propuesta aqui" />
                    </Form.Item>
                </FormGeneral>
            </ModalGeneral>
    )
}