import { userService } from '../../services/UserService'
import { EntrepreneursList } from './EntrepreneursList'
import type { IUser } from '../../types/types'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { message } from 'antd'

export const EntrepreneurView = () => {
  const [entrepreneurs, setEntrepreneurs] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      setLoading(true)
      try {
        const data = await userService.getAllByRole('emprendedor')
        setEntrepreneurs(data)
      } catch (error) {
        console.error(error)
        message.error('Error al cargar las empresas')
      } finally {
        setLoading(false)
      }
    }

    fetchEntrepreneurs()
  }, [])

  return (
    <>
      {/* Lista */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={3} width="100%">
          {entrepreneurs.map((entrepreneur) => (
            <EntrepreneursList key={entrepreneur._id} entrepreneur={entrepreneur} />
          ))}
        </Box>
      )}
    </>
  )
}
