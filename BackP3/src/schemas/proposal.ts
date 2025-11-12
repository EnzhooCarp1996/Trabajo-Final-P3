import mongoose, { Schema, Types } from "mongoose";
import { IProposal, ProposalStatus } from "../types/index";
import { validarTipoUsuario } from "../utils/validarTipoUsuario";

const { ObjectId } = Schema.Types;

const proposalStatuses: ProposalStatus[] = ["en revision", "seleccionada", "descartada"];

const proposalSchema = new Schema<IProposal>(
  {
    desafioId: { type: ObjectId, ref: "Challenge", required: true, },
    emprendedorId: { type: ObjectId, ref: "User", required: true, },
    tituloPropuesta: { type: String, required: true, trim: true, maxlength: 100, },
    descripcion: { type: String, required: true, trim: true, maxlength: 1000, },
    estado: { type: String, enum: proposalStatuses, default: "en revision", required: true, },
    puntos: { type: Number, default: 0, min: 0, },
  },
  { timestamps: true }
);

proposalSchema.pre("save", async function (next) {
  await validarTipoUsuario(this.emprendedorId, "emprendedor");
  next();
});

// Índices, evita que un mismo emprendedor envíe más de una propuesta al mismo desafío
proposalSchema.index({ desafioId: 1, emprendedorId: 1 }, { unique: true }); 

// Filtrar propuestas por estado
proposalSchema.index({ estado: 1 }); 


const Proposal = mongoose.model<IProposal>("Proposal", proposalSchema);

export default Proposal;
