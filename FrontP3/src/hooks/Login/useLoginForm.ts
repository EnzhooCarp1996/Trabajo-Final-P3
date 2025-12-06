import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAuth } from "../../context/Auth/useAuth";
import { authService } from "../../services/AuthService";
import { useState } from "react";
import { Form, Modal } from "antd";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export function useLoginForm() {
  const { login } = useAuth();
  const formRegister = Form.useForm()[0];
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    recordar: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmitLogin = async () => {
  setLoading(true);
  setError(null);

  try {
    localStorage.removeItem("token")
    const data = await authService.logIn(formData.email, formData.password);
    const decoded = jwtDecode(data.token);
    console.log("🔍 TOKEN DECODED:", decoded);
    login(data.token, formData.recordar);
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Error inesperado");
  } finally {
    setLoading(false);
  }
};
  const handleCheckbox = (e: CheckboxChangeEvent) => {
  setFormData(prev => ({
    ...prev,
    recordar: e.target.checked
  }));
};

  const [success, setSuccess] = useState(false);

  const handleChangRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegister = async (values: any) => {
    setLoading(true);
    setError(null);
    Modal.confirm({
      title: "Registro",
      content: "¿Estás seguro que te quieres regristrar?",
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          await authService.create(values);
          setSuccess(true);
          formRegister.resetFields();
        } catch (error) {
              console.error("Error al crear su usuario", error);
              setError(error instanceof Error ? error.message : "Error al crear su usuario");
              toast.error("No se pudo crear el usuario");
        } finally {
          setLoading(false);
        }
      },
    });
    
  };

  return {
    formData,
    showPassword,
    loading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit: handleSubmitLogin,
    handleCheckbox,
    formRegister,
    success,
    handleChangRegister,
    handleSubmitRegister,
  };
}
