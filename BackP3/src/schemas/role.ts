import mongoose, { Schema } from 'mongoose'
import { IRole, UserType } from '@/types/index'

const userTypes: UserType[] = ["empresa", "emprendedor"];

const roleSchema = new Schema<IRole>(
  {
    nombre: { type: String, enum: userTypes, required: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Role = mongoose.model<IRole>('Role', roleSchema)

export default Role
