import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IRole, IUser, UserType } from "../types/index";
import { hashPassword } from "../utils/hashPassword";

const { ObjectId } = Schema.Types;

// Email validation using regex (more secure than mongoose-validator)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = {
  validator: function (v: string): boolean {
    return emailRegex.test(v);
  },
  message: "Por favor, proporcione una dirección de correo electrónico válida.",
};

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: emailValidator,
    },
    password: { type: String, required: true, select: false },
    role: { type: ObjectId, ref: "Role", required: true },
    telefono: { type: String, trim: true },
    nombreEmpresa: { type: String, trim: true },
    descripcion: { type: String, trim: true },
    sitioWeb: { type: String, trim: true },
    nombreCompleto: { type: String, trim: true },
    edad: { type: Number, min: 0 },
  },
  { timestamps: true }
);

userSchema.method(
  "checkPassword",
  async function checkPassword(
    potentialPassword: string
  ): Promise<{ isOk: boolean; isLocked: boolean }> {
    if (!potentialPassword) {
      return Promise.reject(new Error("Password is required"));
    }

    const isMatch = await bcrypt.compare(potentialPassword, this.password);
    const { role } = await this.populate<{ role: IRole }>("role");

    return { isOk: isMatch, isLocked: !role.activo };
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Hasheando password para:", this.email);
  this.password = await hashPassword(this.password);
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
