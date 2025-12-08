import { Typography } from 'antd'

const { Title } = Typography

interface HeaderEntityProps {
  titulo: string
}

export const HeaderEntity: React.FC<HeaderEntityProps> = ({ titulo }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <Title level={3} style={{ color: 'white', margin: 0 }}>
        {titulo}
      </Title>
    </div>
  )
}
