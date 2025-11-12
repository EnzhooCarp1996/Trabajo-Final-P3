import mongoose, { Schema } from "mongoose";
import { IChallenge, ChallengeStatus } from "../types/index";
import { validarTipoUsuario } from "../utils/validarTipoUsuario";

const { ObjectId } = Schema.Types;

// Posibles estados de un challenge
const challengeStatuses: ChallengeStatus[] = ["activo", "inactivo"];

// Definición del schema
const challengeSchema = new Schema<IChallenge>(
  {
    empresaId: { type: ObjectId, ref: "User", required: true, },
    titulo: { type: String, required: true, trim: true, maxlength: 100, },
    descripcion: { type: String, required: true, trim: true, maxlength: 1000, },
    estado: { type: String, enum: challengeStatuses, default: "activo", required: true, },
  },
  { timestamps: true }
);

challengeSchema.pre("save", async function (next) {
  await validarTipoUsuario(this.empresaId, "empresa");
  next();
});

// Index 
challengeSchema.index({ empresaId: 1, estado: 1 });
challengeSchema.index({ empresaId: 1, titulo: 1 }, { unique: true });

// Exportación del modelo
const Challenge = mongoose.model<IChallenge>("Challenge", challengeSchema);

export default Challenge;
