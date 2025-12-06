import { Form, Input } from "antd";

export const FormGeneralItem = () => {

    return (
        <>
            <Form.Item
                name="telefono"
                label={<span style={{ color: "white" }}>Telefono</span>}
                rules={[{ required: true, message: "Ingrese telefono" }]}
                style={{ marginBottom: 4 }}
            >
                <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
                name="email"
                label={<span style={{ color: "white" }}>Email</span>}
                rules={[
                    { required: true, message: "Ingrese el email" },
                    { type: "email", message: "Ingrese un email válido" }
                ]}
                style={{ marginBottom: 4 }}
            >
                <Input style={{ width: "100%" }} type="email" autoComplete="email" />
            </Form.Item>
            <Form.Item
                name="descripcion"
                label={<span style={{ color: "white" }}>Descripción</span>}
                rules={[{ required: true, message: "Ingrese una descripción" }]}
                style={{ marginBottom: 4 }}
                labelCol={{ style: { color: "white" } }}
            >
                <Input.TextArea style={{ width: "100%" }} rows={3} />
            </Form.Item>
        </>
    );
};
