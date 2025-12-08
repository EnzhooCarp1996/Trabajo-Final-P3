import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

function isMongoDuplicateError(
  err: unknown,
): err is { code: number; keyValue: Record<string, unknown> } {
  if (typeof err !== 'object' || err === null) return false

  if (!('code' in err)) return false

  return (err as { code: unknown }).code === 11000
}

function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error('Error capturado:', err)

  // Error de ID inválido (Mongoose CastError)
  if (err instanceof mongoose.Error.CastError && err.kind === 'ObjectId') {
    res.status(400).json({ error: 'Formato de ID inválido' })
    return
  }

  // Error de validación (campo requerido faltante)
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: 'Error de validación', details: err.errors })
    return
  }

  // Error de duplicado (clave única)
  if (isMongoDuplicateError(err)) {
    res.status(409).json({ error: 'Registro duplicado', fields: err.keyValue })
    return
  }

  // Otros errores no manejados
  res.status(500).json({ error: 'Error interno del servidor' })
}

export default errorHandler
