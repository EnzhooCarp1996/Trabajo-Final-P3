import mongoose, { Schema } from "mongoose";
import { IMessage } from "@/types/index";
import { validarTipoUsuario } from "@/utils/validarTipoUsuario";

const { ObjectId } = Schema.Types;

const messageSchema = new Schema<IMessage>(
  {
    empresaId: { type: ObjectId, ref: "User", required: true, },
    emprendedorId: { type: ObjectId, ref: "User", required: true, },
    desafioId: { type: ObjectId, ref: "Challenge", required: true, },
    contenido: { type: String, required: true, trim: true, maxlength: 1000, },
  },
  { timestamps: true }
);

messageSchema.pre("save", async function (next) {
  await validarTipoUsuario(this.empresaId, "empresa");
  next();
});

// Índice compuesto para mejorar búsquedas entre usuarios
messageSchema.index({ empresaId: 1, emprendedorId: 1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message
