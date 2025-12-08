import { IVote } from '@/types'
import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const voteSchema = new Schema<IVote>(
  {
    propuestaId: { type: ObjectId, ref: 'Proposal', required: true },
    empresaId: { type: ObjectId, ref: 'User', required: true },
    valor: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true },
)

voteSchema.index( { propuestaId: 1, empresaId: 1 }, { unique: true });

const Vote = mongoose.model<IVote>("Vote", voteSchema);

export default Vote;
