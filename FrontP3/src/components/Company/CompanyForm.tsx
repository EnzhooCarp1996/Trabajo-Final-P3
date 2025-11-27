import { Form, Input } from "antd";

export const CompanyForm = () => {
    return (
        <>
            <Form.Item
                name="nombreEmpresa"
                label="Nombre de la Empresa"
                rules={[{ required: true, message: "Ingrese el nombre de la empresa" }]}
                style={{ marginBottom: 4 }}
            >
                <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="sitioWeb"
                label="Sitio Web"
                rules={[{ required: true, message: "Ingrese un sitio web válido" }]}
                style={{ marginBottom: 4 }}
            >
                <Input style={{ width: "100%" }} type="url" />
            </Form.Item>
        </>
    )
}