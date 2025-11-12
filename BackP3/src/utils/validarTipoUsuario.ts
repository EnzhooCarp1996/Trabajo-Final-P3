import mongoose from "mongoose";
import { IUser, IRole, UserType } from "../types";

export async function validarTipoUsuario(
  userId: mongoose.Types.ObjectId,
  tipoEsperado: UserType
) {
  // Buscar el usuario y poblar el rol
  const user = await mongoose.model<IUser>("User").findById(userId).populate<{ role: IRole }>("role");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (!user.role || user.role.nombre !== tipoEsperado) {
    throw new Error(`El usuario no es un ${tipoEsperado} válido`);
  }
}
