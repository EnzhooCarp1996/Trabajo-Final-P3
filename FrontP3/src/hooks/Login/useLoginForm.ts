import { useAuth } from "../../context/Auth/useAuth";
import { authService } from "../../services/AuthService";
import { useState } from "react";

export function useLoginForm() {
  const { login } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authService.logIn(formData.email, formData.password);
      login(data.token, formData.recordar);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    loading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
