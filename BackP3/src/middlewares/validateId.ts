import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

export function validateIdParam(req: Request, res: Response, next: NextFunction): Response | void {
  const { id } = req.params

  if (!id) {
    return res.status(400).send("Parameter 'id' is required")
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Formato no valido de Id')
  }

  next()
}
