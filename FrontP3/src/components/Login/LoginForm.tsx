import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { Form, Input, Checkbox, Button, Typography } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Text } = Typography

interface LoginFormProps {
  formData: {
    email: string
    password: string
    recordar: boolean
  }
  error?: string | null
  loading?: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckbox: (e: CheckboxChangeEvent) => void
  handleSubmit: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  error,
  loading,
  handleChange,
  handleCheckbox,
  handleSubmit,
}) => {
  return (
    <Form layout="vertical" style={{ marginTop: '24px' }} onFinish={handleSubmit}>
      {/* EMAIL */}
      <Form.Item
        label={
          <label htmlFor="email" style={{ color: '#ccc' }}>
            Email
          </label>
        }
        name="email"
        rules={[
          { required: true, message: 'El email es obligatorio' },
          { type: 'email', message: 'Ingrese un email válido' },
        ]}
      >
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
          style={{ background: 'transparent', color: 'white', height: '40px' }}
        />
      </Form.Item>

      {/* PASSWORD */}
      <Form.Item
        label={
          <label htmlFor="password" style={{ color: '#ccc' }}>
            Contraseña
          </label>
        }
        name="password"
        rules={[
          { required: true, message: 'La contraseña es obligatoria' },
          { min: 3, message: 'La contraseña debe tener al menos 4 caracteres' },
        ]}
      >
        <Input.Password
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone twoToneColor="#ffffff" /> : <EyeInvisibleOutlined style={{ color: 'white' }} />
          }
          style={{ background: 'transparent', color: 'white', height: '40px' }}
        />
      </Form.Item>

      {/* RECORDAR */}
      <Form.Item>
        <Checkbox
          id="recordar"
          name="recordar"
          checked={formData.recordar}
          onChange={handleCheckbox}
          style={{ color: 'white' }}
        >
          Recordar
        </Checkbox>
      </Form.Item>

      {/* ERROR */}
      {error && (
        <Text type="danger" style={{ marginBottom: '10px', display: 'block' }}>
          {error}
        </Text>
      )}

      {/* BOTÓN */}
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        block
        style={{
          background: 'linear-gradient(90deg, #1f8f4b, #2fb36a)',
          border: 'none',
          height: '45px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mt-3">{error}</div>}
    </Form>
  )
}
