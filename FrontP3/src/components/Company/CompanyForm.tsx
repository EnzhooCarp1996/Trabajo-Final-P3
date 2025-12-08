import { Form, Input } from 'antd'

export const CompanyForm = () => {
  return (
    <>
      <Form.Item
        name="nombreEmpresa"
        label={<span style={{ color: 'white' }}>Nombre de la Empresa</span>}
        rules={[{ required: true, message: 'Ingrese el nombre de la empresa' }]}
        style={{ marginBottom: 4 }}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="sitioWeb"
        label={<span style={{ color: 'white' }}>Sitio Web</span>}
        rules={[{ required: true, message: 'Ingrese un sitio web válido' }]}
        style={{ marginBottom: 4 }}
      >
        <Input style={{ width: '100%' }} type="url" />
      </Form.Item>
    </>
  )
}
