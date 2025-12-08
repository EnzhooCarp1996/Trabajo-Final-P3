import type { FormInstance } from "antd"
import type { RuleObject } from "antd/es/form"
import type { CreateUserRequest } from "../types/types"

export const validateConfirmPassword = (form: FormInstance<CreateUserRequest>) => ({
  validator(_: RuleObject, value: string) {
    if (form.getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject('Las contraseñas no coinciden')
  },
})
