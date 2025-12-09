import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CreateUserRequest } from '../../types/types'
import { authService } from '../../services/AuthService'
import { useAuth } from '../../context/Auth/useAuth'
import { Form, message, Modal } from 'antd'
import { useState } from 'react'

export function useLoginForm() {
  const { login } = useAuth()
  const [formRegister] = Form.useForm<CreateUserRequest>();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    recordar: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmitLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      localStorage.removeItem('token')
      const data = await authService.logIn(formData.email, formData.password)
      login(data.token, formData.recordar)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }
  const handleCheckbox = (e: CheckboxChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      recordar: e.target.checked,
    }))
  }


  const handleSubmitRegister = async (values: CreateUserRequest) => {
    setLoading(true)
    setError(null)
    Modal.confirm({
      title: 'Registro',
      content: '¿Estás seguro que te quieres regristrar?',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        try {
          await authService.create(values)
          formRegister.resetFields()
          message.success('Usuario registrado con exito')
        } catch (error) {
          console.error('Error al crear su usuario', error)
          setError(error instanceof Error ? error.message : 'Error al crear su usuario')
          message.error('No se pudo crear el usuario')
        } finally {
          setLoading(false)
        }
      },
    })
  }

  return {
    formData,
    showPassword,
    loading,
    error,
    setShowPassword,
    handleChange,
    handleSubmitLogin,
    handleCheckbox,
    formRegister,
    handleSubmitRegister,
  }
}
