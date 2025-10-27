import { Form, Input, Select } from "antd";
import type { Company } from "../../types/types";

const { Option } = Select;

interface ChallengeFormProps {
    companies: Company[]
}

export const ChallengeForm: React.FC<ChallengeFormProps> = ({ companies }) => {
    return (
        <>
            <Form.Item
                name="empresaId"
                label="Empresa"
                rules={[{ required: true, message: "Seleccione una empresa" }]}
            >
                <Select placeholder="Seleccionar empresa">
                    {companies.map((company) => (
                        <Option key={company.id} value={company.id}>
                            {company.nombreEmpresa}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="titulo"
                label="Título"
                rules={[{ required: true, message: "Ingrese un título" }]}
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
                name="estado"
                label="Estado"
                rules={[{ required: true, message: "Seleccione un estado" }]}
            >
                <Select>
                    <Option value="activo">Activo</Option>
                    <Option value="inactivo">Inactivo</Option>
                </Select>
            </Form.Item>

        </>
    )
}