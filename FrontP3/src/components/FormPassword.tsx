import { validateConfirmPassword } from '../utils/validatorPassword'
import type { CreateUserRequest } from '../types/types';
import { Form, Input, type FormInstance } from 'antd'

interface FormPasswordProps {
  form: FormInstance<CreateUserRequest>;
}

export const FormPassword: React.FC<FormPasswordProps> = ({ form }) => {
  return (
    <>
      <Form.Item
        name="password"
        label={<span style={{ color: 'white' }}>Contraseña</span>}
        rules={[
          { required: true, message: 'Ingrese una contraseña' },
          { min: 6, message: 'Debe tener al menos 6 caracteres' },
        ]}
        style={{ marginBottom: 4 }}
      >
        <Input.Password style={{ width: '100%' }} autoComplete="new-password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<span style={{ color: 'white' }}>Repetir Contraseña</span>}
        dependencies={['password']}
        rules={[{ required: true, message: 'Debe repetir la contraseña' }, validateConfirmPassword(form)]}
        style={{ marginBottom: 8 }}
      >
        <Input.Password style={{ width: '100%' }} autoComplete="new-password" />
      </Form.Item>
    </>
  )
}
