import { Form, Input } from "antd";
import { validateConfirmPassword } from "../utils/validatorPassword";

export const FormGeneralItem = ({ form }: { form: any }) => {

    return (
        <>
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
                <Input type="email" autoComplete="email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                    { required: true, message: "Ingrese una contraseña" },
                    { min: 6, message: "Debe tener al menos 6 caracteres" }
                ]}
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Repetir Contraseña"
                dependencies={["password"]}
                rules={[
                    { required: true, message: "Repita la contraseña" },
                    validateConfirmPassword(form)
                ]}
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>
        </>
    );
};
