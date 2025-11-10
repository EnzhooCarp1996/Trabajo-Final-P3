import mongoose from "mongoose";

export async function validarTipoUsuario(userId: mongoose.Types.ObjectId, tipoEsperado: "empresa" | "emprendedor") {
  const user = await mongoose.model("User").findById(userId);
  if (!user || user.role !== tipoEsperado) {
    throw new Error(`El usuario no es un ${tipoEsperado} válido`);
  }
}

