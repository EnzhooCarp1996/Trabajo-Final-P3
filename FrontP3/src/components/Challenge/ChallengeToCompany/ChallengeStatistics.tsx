import { PlusOutlined, TrophyOutlined } from '@ant-design/icons'
import type { IChallenge } from '../../../types/types'
import { useEffect, useState } from 'react'
import { Button, Tag } from 'antd'

interface ChallengeStatisticsProps {
  challenges: IChallenge[]
  openModal: () => void
}

export const ChallengeStatistics: React.FC<ChallengeStatisticsProps> = ({ challenges, openModal }) => {
  // Detectar mobile para cambiar estilos en línea
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 600px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const activeChallenges = challenges.filter((c) => c.estado === 'activo').length
  const finishedChallenges = challenges.filter((c) => c.estado === 'finalizado').length
  const inactiveChallenges = challenges.filter((c) => c.estado === 'inactivo').length
  const totalChallenges = challenges.length

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: 12,
        width: '100%',
      }}
    >
      {/* IZQUIERDA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        <TrophyOutlined
          style={{
            fontSize: 24,
            color: 'white',
            padding: 8,
            backgroundColor: '#efb810',
            borderRadius: 8,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: isMobile ? 'center' : 'flex-start',
            borderRadius: 12,
          }}
        >
          <Tag style={{ borderRadius: 12, backgroundColor: 'green' }} color="white">
            Activos: {activeChallenges}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'blue' }} color="white">
            Finalizados: {finishedChallenges}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'red' }} color="white">
            Inactivos: {inactiveChallenges}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'grey' }} color="white">
            Total: {totalChallenges}
          </Tag>
        </div>
      </div>

      {/* BOTÓN */}
      <Button
        type="primary"
        onClick={() => openModal()}
        icon={<PlusOutlined />}
        size="large"
        style={{
          borderRadius: 8,
          fontWeight: 600,
          height: 40,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        Nuevo
      </Button>
    </div>
  )
}
