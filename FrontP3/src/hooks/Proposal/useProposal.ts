import { useEffect, useState } from 'react'
import type { IProposal, IChallenge, ProposalStatus, IChallengeRef } from '../../types/types'
import { storage } from '../../storage'
import { Form, Modal } from 'antd'
import { proposalService } from '../../services/ProposalService'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/Auth/useAuth'
import { estadoPropuestas } from '../../utils/utilsProposals'

export const useProposal = () => {
  const { _id } = useAuth()
  const [isModalProposalOpen, setIsModalProposalOpen] = useState(false)
  const [editingProposal, setEditingProposal] = useState<IProposal | null>(null)
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [loading, setLoading] = useState(false)
  const formProposal = Form.useForm()[0]
  const [filtroEstado, setFiltroEstado] = useState<ProposalStatus>(estadoPropuestas[0].value as ProposalStatus)
  const proposalsFiltradas = proposals.filter((p) => p.estado === filtroEstado)
  const [activeTab, setActiveTab] = useState<ProposalStatus>('en revision')

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true)
      try {
        const data = await proposalService.getAll()
        setProposals(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar las propuestas')
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
      setFiltroEstado(savedTab as any)
    }
  }, [])

  const [votedProposals, setVotedProposals] = useState<string[]>(
    JSON.parse(localStorage.getItem('votedProposals') || '[]')
  )

  const toggleVoto = (proposalId: string) => {
    const yaVoto = votedProposals.includes(proposalId)

    const updated = proposals.map((p) => {
      if (p._id === proposalId) {
        return { ...p, puntos: yaVoto ? p.puntos - 1 : p.puntos + 1 }
      }
      return p
    })

    setProposals(updated)
    storage.setProposals(updated)

    let updatedVotes

    if (yaVoto) {
      updatedVotes = votedProposals.filter((id) => id !== proposalId)
    } else {
      updatedVotes = [...votedProposals, proposalId]
    }

    setVotedProposals(updatedVotes)
    localStorage.setItem('votedProposals', JSON.stringify(updatedVotes))
  }

  const [selectedChallenge, setSelectedChallenge] = useState<IChallengeRef | null>(null)

  const openModalProposal = (challenge?: IChallenge) => {
    setEditingProposal(null)
    setSelectedChallenge(challenge ?? null)
    formProposal?.resetFields()
    formProposal?.setFieldsValue({
      desafioId: challenge ? challenge.titulo : '',
      emprendedorId: _id,
      puntos: 0,
    })
    setIsModalProposalOpen(true)
  }

  const closeModalProposal = () => {
    setIsModalProposalOpen(false)
    setEditingProposal(null)
  }

  const handleSubmitProposal = async (values: any) => {
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

          closeModalProposal()
        } catch (error) {
          console.error('Error al crear la propuesta', error)
          toast.error('No se pudo crear la propuesta')
        }
      },
    })
  }

  return {
    loading,
    formProposal,
    votedProposals,
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
    toggleVoto,
  }
}
