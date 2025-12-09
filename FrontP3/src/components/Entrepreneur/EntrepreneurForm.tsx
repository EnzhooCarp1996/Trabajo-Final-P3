import type { StoreValue } from 'antd/es/form/interface'
import type { RuleObject } from 'antd/es/form'
import { Form, Input } from 'antd'

export const EntrepreneurForm = () => {
  // validators.ts
  const validarEdad = () => {
    return {
      validator: (_: RuleObject, value: StoreValue) => {
        if (!value) {
          return Promise.reject('Ingrese la edad')
        }
        if (isNaN(value)) {
          return Promise.reject('La edad debe ser un número')
        }
        if (value < 18 || value > 100) {
          return Promise.reject('Edad debe estar entre 18 y 100')
        }
        return Promise.resolve()
      },
    }
  }

  return (
    <>
      <Form.Item
        name="nombreCompleto"
        label={<span style={{ color: 'white' }}>Nombre Completo</span>}
        rules={[{ required: true, message: 'Ingrese el nombre completo' }]}
        style={{ marginBottom: 4 }}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="edad"
        label={<span style={{ color: 'white' }}>Edad</span>}
        rules={[{ required: true, message: 'Ingrese la edad' }, validarEdad()]}
        style={{ marginBottom: 4 }}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
    </>
  )
}
