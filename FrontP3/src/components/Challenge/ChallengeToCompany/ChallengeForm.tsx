import { Form, Input, type FormInstance } from 'antd'
import { ModalGeneral } from '../../ModalGeneral'
import { FormGeneral } from '../../FormGeneral'
import type { CreateChallengeRequest } from '../../../types/types'

interface ChallengeFormProps {
  isModalOpen: boolean
  closeModal: () => void
  formSubmit: () => void
  editing?: boolean
  form: FormInstance<CreateChallengeRequest>
  handleSubmit: (values: CreateChallengeRequest) => void
}

export const ChallengeForm: React.FC<ChallengeFormProps> = ({
  isModalOpen,
  closeModal,
  formSubmit,
  editing,
  form,
  handleSubmit,
}) => {
  return (
    <ModalGeneral titulo="Desafío" isOpen={isModalOpen} onClose={closeModal} onOk={formSubmit} editing={editing}>
      <FormGeneral form={form} handleSubmit={handleSubmit}>
        <Form.Item
          name="titulo"
          label={<span style={{ color: 'white' }}>Título del Desafio</span>}
          rules={[
            { required: true, message: 'El título es obligatorio' },
            { min: 5, message: 'El título debe tener al menos 5 caracteres' },
            { max: 100, message: 'El título no puede superar los 100 caracteres' },
          ]}
        >
          <Input placeholder="Ingrese el titulo del desafio aqui" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label={<span style={{ color: 'white' }}>Descripción</span>}
          rules={[
            { required: true, message: 'La descripción es obligatoria' },
            { min: 10, message: 'La descripción debe tener al menos 10 caracteres' },
            { max: 500, message: 'La descripción no puede superar los 500 caracteres' },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Ingrese la descripción de la propuesta aqui" />
        </Form.Item>
      </FormGeneral>
    </ModalGeneral>
  )
}
