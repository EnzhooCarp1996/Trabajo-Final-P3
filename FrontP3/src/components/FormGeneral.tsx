import { Form, type FormInstance } from 'antd'

interface FormGeneralProps<T> {
  form: FormInstance<T>
  handleSubmit: (values: T) => void
  children: React.ReactNode
}

export const FormGeneral = <T,>({ form, handleSubmit, children }: FormGeneralProps<T>) => {
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: '100%', maxWidth: '100%' }}>
      {children}
    </Form>
  )
}
