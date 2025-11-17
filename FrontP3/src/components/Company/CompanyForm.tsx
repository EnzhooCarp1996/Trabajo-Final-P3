import { Form, Input } from "antd";

export const CompanyForm = () => {
    return (
        <>
            <Form.Item
                name="nombreEmpresa"
                label="Nombre de la Empresa"
                rules={[{ required: true, message: "Ingrese el nombre de la empresa" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[{ required: true, message: "Ingrese una descripción" }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="sitioWeb"
                label="Sitio Web"
                rules={[{ required: true, message: "Ingrese un sitio web válido" }]}
            >
                <Input type="url" />
            </Form.Item>
        </>
    )
}