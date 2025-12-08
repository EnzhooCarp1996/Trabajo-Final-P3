import { EntrepreneurProfile } from './EntrepreneurProfile'
import { userService } from '../../services/UserService'
import type { IUser } from '../../types/types'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'

interface EntrepreneurModalProps {
  _id: string
  open: boolean
  onClose: () => void
}

export const EntrepreneurModal = ({ _id, open, onClose }: EntrepreneurModalProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (!_id) return

    userService
      .getById(_id)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error('Error cargando usuario:', err))
  }, [_id])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<span style={{ color: 'red', fontSize: 20 }}>✕</span>}
      styles={{
        mask: { background: 'rgba(0,0,0,0.5)' },
        content: { background: 'rgba(0,0,0,0.75)' },
        body: { padding: 0, background: 'rgba(0,0,0,0.75)' },
      }}
    >
      {/* Contenedor general */}
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', color: 'white' }}>
        {/* 🔵 Banner */}
        <div
          style={{
            width: '100%',
            height: 100,
            background: 'linear-gradient(90deg, #006ac2, #003f78)',
            position: 'relative',
          }}
        ></div>

        {/* Contenido */}
        <div style={{ padding: '40px 30px' }}>
          <EntrepreneurProfile user={currentUser} />
        </div>
      </div>
    </Modal>
  )
}
