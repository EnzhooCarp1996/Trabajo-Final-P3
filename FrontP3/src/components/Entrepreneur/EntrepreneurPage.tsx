import { EntrepreneurProfile } from './EntrepreneurProfile'
import { userService } from '../../services/UserService'
import type { IUser } from '../../types/types'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BackHeader } from '../BackHeader'

export const EntrepreneurPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (!id) return
    userService.getById(id).then(setUser)
  }, [id])

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <BackHeader />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
        {/* Banner */}
        <div
          style={{
            width: '100%',
            height: 120,
            borderRadius: 12,
            background: 'linear-gradient(90deg,#006ac2,#003f78)',
            marginBottom: -60,
          }}
        />

        <EntrepreneurProfile user={user} showbutton />
      </div>
    </>
  )
}
