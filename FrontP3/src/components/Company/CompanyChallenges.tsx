import { challengeService } from '../../services/ChallengeService'
import { useEffect, useState, type FC } from 'react'
import type { IChallenge } from '../../types/types'

interface CompanyChallengesProps {
  empresaId: string
  onCountChange?: (count: number) => void
}

export const CompanyChallenges: FC<CompanyChallengesProps> = ({ empresaId, onCountChange }) => {
  const [challenges, setChallenges] = useState<IChallenge[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!empresaId) return

    const fetchChallenges = async () => {
      setLoading(true)
      try {
        const result = await challengeService.getAll({ empresaId, estado: ['activo', 'finalizado'] })
        setChallenges(result)
        onCountChange?.(result.length)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [empresaId])

  if (loading) return <p>Cargando desafíos...</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {challenges.length === 0 && <p>No tiene desafíos.</p>}

      {challenges.map((c) => (
        <div
          key={c._id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 8,
            background: '#006db2',
            borderRadius: 6,
          }}
        >
          <strong>
            {c.titulo}: {c.estado}
          </strong>
        </div>
      ))}
    </div>
  )
}
