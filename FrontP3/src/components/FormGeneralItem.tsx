import { Form, Input } from "antd";
import { validateConfirmPassword } from "../utils/validatorPassword";

interface FormGeneralItemProps {
    form: any;
    requirePassword?: boolean;
}

export const FormGeneralItem: React.FC<FormGeneralItemProps> = ({ form, requirePassword = true }) => {

    return (
        <>
            <Form.Item
                name="telefono"
                label="telefono"
                rules={[{ required: true, message: "Ingrese telefono" }]}
                style={{ marginBottom: 4 }}
            >
                <Input style={{ width: "100%" }}/>
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
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
                label="Descripción"
                rules={[{ required: true, message: "Ingrese una descripción" }]}
                style={{ marginBottom: 4 }}
            >
                <Input.TextArea style={{ width: "100%" }} rows={3} />
            </Form.Item>
            <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                    ...(requirePassword
                        ? [
                            { required: true, message: "Ingrese una contraseña" },
                            { min: 6, message: "Debe tener al menos 6 caracteres" }
                        ]
                        : []
                    )
                ]}
                style={{ marginBottom: 4 }}
            >
                <Input.Password style={{ width: "100%" }} autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Repetir Contraseña"
                dependencies={["password"]}
                rules={[
                    validateConfirmPassword(form)
                ]}
                style={{ marginBottom: 8 }}
            >
                <Input.Password style={{ width: "100%" }} autoComplete="new-password" />
            </Form.Item>
        </>
    );
};
