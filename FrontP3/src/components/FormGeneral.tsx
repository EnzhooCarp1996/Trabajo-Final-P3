import { Form } from "antd";

interface FormGeneralProps {
    form: any;
    handleSubmit: (values: any) => void;
    children: React.ReactNode;
}

export const FormGeneral: React.FC<FormGeneralProps> = ({ form, handleSubmit, children }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ marginTop: 16 }}
        >
            {children}
        </Form>
    );
};

