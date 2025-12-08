import { useEffect, useState } from 'react'
import type { IProposal, IChallenge, ProposalStatus, IChallengeRef, CreateProposalRequest } from '../../types/types'
import { Form, message, Modal } from 'antd'
import { proposalService } from '../../services/ProposalService'
import { useAuth } from '../../context/Auth/useAuth'
import { estadoPropuestas } from '../../utils/utilsProposals'
import axios from 'axios'

export const useProposal = () => {
  const { _id } = useAuth()
  const [isModalProposalOpen, setIsModalProposalOpen] = useState(false)
  const [editingProposal, setEditingProposal] = useState<IProposal | null>(null)
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [loading, setLoading] = useState(false)
  const [formProposal] = Form.useForm<CreateProposalRequest>()
  const [filtroEstado, setFiltroEstado] = useState<ProposalStatus>(estadoPropuestas[0].value as ProposalStatus)
  const proposalsFiltradas = proposals.filter((p) => p.estado === filtroEstado)
  const [activeTab, setActiveTab] = useState<ProposalStatus>('en revision')
  const [selectedChallenge, setSelectedChallenge] = useState<IChallengeRef | null>(null)

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true)
      try {
        const data = await proposalService.getAll()
        setProposals(data)
      } catch (error) {
        console.error(error)
        message.error('Error al cargar las propuestas')
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  useEffect(() => {
    const savedTab = localStorage.getItem('activeProposalTab')
    if (savedTab) {
      setActiveTab(savedTab as ProposalStatus)
      setFiltroEstado(savedTab as ProposalStatus)
    }
  }, [])

  const openModalProposal = (challenge: IChallenge) => {
    setEditingProposal(null)
    setSelectedChallenge(challenge ?? null)
    formProposal?.resetFields()
    formProposal?.setFieldsValue({
      desafioId: challenge._id,
      emprendedorId: _id,
    })
    setIsModalProposalOpen(true)
  }

  const closeModalProposal = () => {
    setIsModalProposalOpen(false)
    setEditingProposal(null)
  }

  const handleSubmitProposal = async (values: CreateProposalRequest) => {
    if (!selectedChallenge) return
    Modal.confirm({
      title: 'Enviar propuesta',
      content: '¿Estás seguro de que quieres hacer esta Propuesta?',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        try {
          const newProposal = await proposalService.create({
            ...values,
            desafioId: selectedChallenge?._id,
            emprendedorId: _id,
          })
          setProposals((prev) => [...prev, newProposal])
          message.success(`Se creo con exito la propuesta "${newProposal.tituloPropuesta}"`)
          closeModalProposal()
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            message.error('Ya enviaste una propuesta para este desafío')
            console.error('Ya enviaste una propuesta para este desafío: ', error)
            return
          }
          console.error('Error al crear la propuesta', error)
          message.error('No se pudo crear la propuesta')
        }
      },
    })
  }

  return {
    loading,
    formProposal,
    proposalsFiltradas,
    isModalProposalOpen,
    editingProposal,
    selectedChallenge,
    activeTab,
    setActiveTab,
    setFiltroEstado,
    handleSubmitProposal,
    openModalProposal,
    closeModalProposal,
  }
}
