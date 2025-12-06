export const cellBodyStyle: React.CSSProperties = {
  backgroundColor: '#002140',
  color: 'white',
  borderBottom: '3px solid #003a6c',
}

export const getStatusColorChallenges = (estado: string) => {
  switch (estado) {
    case 'activo':
      return '#52c41a'
    case 'inactivo':
      return '#f5222d'
    default:
      return '#1677ff'
  }
}

export const getStatusStylesChallenges = (estado: string) => {
  switch (estado) {
    case 'activo':
      return {
        background: '#52c41a', // verde
        color: '#34C759',
        borderColor: '#34C759',
      }
    case 'finalizado':
      return {
        background: '#1677ff', // azul
        color: '#007AFF',
        borderColor: '#007AFF',
      }
    case 'inactivo':
      return {
        background: 'red', // rojo
        color: '#FF3B30',
        borderColor: '#FF3B30',
      }
    default:
      return {
        background: 'grey',
        color: '#8E8E93',
        borderColor: '#8E8E93',
      }
  }
}

export const estadochallenges = [
  { value: 'activo', label: 'Activo' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'inactivo', label: 'Inactivo' },
]
