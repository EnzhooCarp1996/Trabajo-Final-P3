import type { IProposal, IChallengeRef, CreateProposalRequest } from '../../types/types'
import { proposalService } from '../../services/ProposalService'
import { useAuth } from '../../context/Auth/useAuth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from 'antd'
import { Form } from 'antd'

export const useProposalViewById = () => {
  const { _id } = useAuth()
  const [formProposal] = Form.useForm<CreateProposalRequest>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProposal, setEditingProposal] = useState<IProposal | null>(null)
  const [proposals, setProposals] = useState<IProposal[]>([])

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await proposalService.getAll({ emprendedorId: _id })
        setProposals(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar tus propuestas')
      }
    }

    fetchProposals()
  }, [_id])

  const [selectedChallenge, setSelectedChallenge] = useState<IChallengeRef | null>(null)

  const openModalProposal = (proposal?: IProposal) => {
    setEditingProposal(proposal || null)
    setIsModalOpen(true)

    setTimeout(() => {
      if (proposal) {
        formProposal.setFieldsValue({
          tituloPropuesta: proposal.tituloPropuesta,
          descripcion: proposal.descripcion,
          desafioId: proposal.desafioId._id,
        })
        setSelectedChallenge(proposal.desafioId)
      } else {
        formProposal.resetFields()
      }
    }, 100)
  }

  const closeModalProposal = () => {
    setIsModalOpen(false)
    setEditingProposal(null)
  }

  const handleSubmitProposalById = async (values: CreateProposalRequest) => {
    if (!editingProposal) return

    Modal.confirm({
      title: 'Actualizar propuesta',
      content: '¿Estás seguro de que querés guardar los cambios?',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        try {
          const updatedProposal = await proposalService.update(editingProposal._id, values)
          const updated = proposals.map((p) => (p._id === editingProposal._id ? updatedProposal : p))
          setProposals(updated)
          toast.success('Propuesta actualizada correctamente')
          closeModalProposal()
        } catch (error) {
          console.error('Error al actualizar propuesta', error)
          toast.error('No se pudo actualizar la propuesta')
        }
      },
    })
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Eliminar propuesta',
      content: '¿Estás seguro de que querés eliminar esta propuesta?',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        try {
          await proposalService.delete(id)
          setProposals(proposals.filter((p) => p._id !== id))
          toast.success('Propuesta eliminada correctamente')
        } catch (error) {
          console.error(error)
          toast.error('No se pudo eliminar la propuesta')
        }
      },
    })
  }

  return {
    formProposal,
    proposals,
    isModalProposalOpen: isModalOpen,
    editingProposal,
    selectedChallenge,
    openModalProposal,
    closeModalProposal,
    handleSubmitProposalById,
    handleDelete,
  }
}
