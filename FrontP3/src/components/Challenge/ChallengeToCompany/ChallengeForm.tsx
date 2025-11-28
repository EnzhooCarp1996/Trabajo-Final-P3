import { Form, Input } from "antd";


export const ChallengeForm: React.FC = () => {
    return (
        <>
            <Form.Item
                name="titulo"
                label="Título del Desafio"
                rules={[
                    { required: true, message: "El título es obligatorio" },
                    { min: 5, message: "El título debe tener al menos 5 caracteres" },
                    { max: 100, message: "El título no puede superar los 100 caracteres" },
                ]}
            >
                <Input placeholder="Ingrese el titulo del desafio aqui"/>
            </Form.Item>

            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[
                    { required: true, message: "La descripción es obligatoria" },
                    { min: 10, message: "La descripción debe tener al menos 10 caracteres" },
                    { max: 500, message: "La descripción no puede superar los 500 caracteres" },
                ]}
            >
                <Input.TextArea rows={3} placeholder="Ingrese la descripción de la propuesta aqui" />
            </Form.Item>

        </>
    )
}