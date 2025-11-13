import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error capturado:", err.message);

  // Error de ID inválido (Mongoose CastError)
  if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
    res.status(400).json({ error: "Formato de ID inválido" });
    return;
  }

  // Error de validación (por ejemplo, campo requerido faltante)
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: "Error de validación", details: err.errors });
    return;
  }

  // Error de duplicado (clave única)
  if (err.code === 11000) {
    res.status(409).json({ error: "Registro duplicado", fields: err.keyValue });
    return;
  }

  // Otros errores no manejados
  res.status(500).json({ error: "Error interno del servidor" });
}
