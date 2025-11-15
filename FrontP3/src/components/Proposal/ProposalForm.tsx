
import type { IChallenge } from "../../types/types";
import { Form, Input, Typography } from "antd";

const { Title } = Typography;

interface ChallengeFormProps {
    selectedChallenge: IChallenge | null;
}

export const ProposalForm: React.FC<ChallengeFormProps> = ({ selectedChallenge }) => {


    return (
        <>
            <Title level={3}>{selectedChallenge?.titulo}</Title>

            <Form.Item name="tituloPropuesta" label="Título de la Propuesta" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
            </Form.Item>
        </>
    )
}