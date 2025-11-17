import { Form, Input } from "antd";

export const EntrepreneurForm = () => {
    return (
        <>
            <Form.Item
                name="nombreCompleto"
                label="Nombre Completo"
                rules={[{ required: true, message: "Ingrese el nombre completo" }]}
            >
                <Input />
            </Form.Item>

        </>
    )
}