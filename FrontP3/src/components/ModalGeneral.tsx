import { Modal } from 'antd'
import { Typography } from 'antd'

const { Title } = Typography

interface ModalGeneralProps {
  titulo: string
  isOpen: boolean
  onClose: () => void
  onOk: () => void
  editing?: boolean
  children: React.ReactNode
}

export const ModalGeneral: React.FC<ModalGeneralProps> = ({
  titulo,
  isOpen,
  onClose,
  onOk,
  editing = false,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={onOk}
      okText={editing ? 'Actualizar' : 'Crear'}
      cancelText="Cancelar"
      closeIcon={<span style={{ color: 'red', fontSize: 20 }}>✕</span>}
      styles={{
        header: {
          background: '#0b1a2e',
          color: 'white',
          borderBottom: '1px solid #1677ff',
        },
        body: {
          background: '#0d1117',
          color: 'white',
          padding: '24px',
        },
        content: {
          background: '#0d1117',
          borderRadius: '12px',
          border: '1px solid #1677ff',
          boxShadow: '0 0 12px rgba(22, 119, 255, 0.4)',
        },
      }}
      okButtonProps={{ style: { backgroundColor: '#1677ff' } }}
    >
      <Title level={3} style={{ marginBottom: 16, color: 'white' }}>
        {editing ? `Editar ${titulo}` : `${titulo}`}
      </Title>
      {children}
    </Modal>
  )
}
