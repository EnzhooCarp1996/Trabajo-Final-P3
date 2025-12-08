import { Row } from 'antd'

interface GridRowProps {
  children: React.ReactNode
}

export const GridRow: React.FC<GridRowProps> = ({ children }) => {
  return <Row gutter={[16, 16]}>{children}</Row>
}
