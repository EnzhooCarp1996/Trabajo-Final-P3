import { CalendarOutlined, FileTextOutlined, EditOutlined, DeleteOutlined, TrophyOutlined, ExportOutlined } from '@ant-design/icons'
import { Button, List, Space, Avatar, Tag, type FormInstance, Tooltip } from 'antd'
import { getStatusColorProposals } from '../../../utils/utilsProposals'
import type { IProposal } from '../../../types/types'
import { useNavigate } from 'react-router-dom'

interface ProposalDescriptionsProps {
  proposal: IProposal
  openModal: (proposal: IProposal, form?: FormInstance<IProposal>) => void
  handleDelete: (id: string) => void
}

export const ProposalDescriptions: React.FC<ProposalDescriptionsProps> = ({ proposal, openModal, handleDelete }) => {
  const navigate = useNavigate()
  return (
    <List.Item
      style={{ backgroundColor: '#8dc8f4', marginBottom: '8px', borderRadius: '8px', padding: '16px' }}
      actions={[
        <Button type="link" icon={<EditOutlined />} onClick={() => openModal(proposal)}>
          Editar
        </Button>,
        <Button danger type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(proposal._id)}>
          Eliminar
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            size="large"
            icon={<FileTextOutlined />}
            style={{ backgroundColor: getStatusColorProposals(proposal.estado) }}
          />
        }
        title={
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontWeight: 600 }}>{proposal.tituloPropuesta}</span>
            <Tag
              color={getStatusColorProposals(proposal.estado)}
              style={{ borderRadius: 12, color: 'white', fontWeight: 600 }}
            >
              {proposal.estado}
            </Tag>
          </Space>
        }
        description={
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>{proposal.descripcion}</div>



            <Space size="large" style={{ fontSize: 13, color: '#8c8c8c' }}>
              <span>Creado el día</span>
              <span>
                <CalendarOutlined /> {new Date(proposal.createdAt).toLocaleDateString()}
              </span>
              <span>
                <strong>{proposal.puntos} puntos</strong>
              </span>
            </Space>

            <Space size="large" style={{ fontSize: 13, color: '#8c8c8c' }}>
              <span>
                <TrophyOutlined /> {proposal.desafioId?.titulo || 'Desafío no disponible'}
              </span>
              <Tooltip title="Ver Desafío">
              <div onClick={() => navigate(`/proposals/challenge/${proposal.desafioId._id}`)} style={{ cursor: 'pointer', color: 'black' }}>
                <ExportOutlined style={{ fontSize: 15 }} />
              </div>
              </Tooltip>
              
            </Space>
          </Space>
        }
      />
    </List.Item>
  )
}
