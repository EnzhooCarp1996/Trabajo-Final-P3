export const getStatusColorProposals = (estado: string) => {
  switch (estado) {
    case 'seleccionada':
      return '#52c41a'
    case 'descartada':
      return '#f5222d'
    default:
      return '#1677ff'
  }
}

export const estadoPropuestas = [
  { value: 'en revision', label: 'En revisión' },
  { value: 'seleccionada', label: 'Seleccionadas' },
  { value: 'descartada' , label: 'Descartadas' },
]

export const getStatusStylesProposals = (estado: string) => {
  switch (estado) {
    case 'seleccionada':
      return {
        background: '#52c41a', // verde
        color: '#34C759',
        borderColor: '#34C759',
      }
    case 'en revision':
      return {
        background: '#1677ff', // azul
        color: '#007AFF',
        borderColor: '#007AFF',
      }
    case 'descartada':
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
