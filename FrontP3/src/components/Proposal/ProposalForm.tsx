import type { Challenge, Entrepreneur } from "../../types/types";
import { Form, Input, Select } from "antd";

const { Option } = Select;

interface ChallengeFormProps {
    challenges: Challenge[],
    entrepreneurs: Entrepreneur[],
}

export const ProposalForm: React.FC<ChallengeFormProps> = ({ challenges, entrepreneurs }) => {
    return (
        <>
            <Form.Item name="desafioId" label="Desafío" rules={[{ required: true, message: "Seleccione un desafío" }]}>
                <Select placeholder="Seleccionar desafío">
                    {challenges.map((c) => (
                        <Option key={c.id} value={c.id}>
                            {c.titulo}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="emprendedorId" label="Emprendedor" rules={[{ required: true, message: "Seleccione un emprendedor" }]}>
                <Select placeholder="Seleccionar emprendedor">
                    {entrepreneurs.map((e) => (
                        <Option key={e.id} value={e.id}>
                            {e.nombreCompleto}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="tituloPropuesta" label="Título de la Propuesta" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item name="estado" label="Estado" rules={[{ required: true }]}>
                <Select>
                    <Option value="en revisión">En Revisión</Option>
                    <Option value="seleccionada">Seleccionada</Option>
                    <Option value="descartada">Descartada</Option>
                </Select>
            </Form.Item>

            <Form.Item name="puntos" label="Puntos" rules={[{ required: true }]}>
                <Input type="number" min={0} max={100} />
            </Form.Item>

        </>
    )
}