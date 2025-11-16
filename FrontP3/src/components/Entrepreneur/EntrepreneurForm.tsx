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
            <Form.Item
                name="telefono"
                label="telefono"
                rules={[{ message: "Ingrese telefono" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: "Ingrese el email" },
                    { type: "email", message: "Ingrese un email válido" }
                ]}
            >
                <Input type="email" />
            </Form.Item>

        </>
    )
}