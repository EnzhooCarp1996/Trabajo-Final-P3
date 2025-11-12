import express, { Request, Response, NextFunction } from "express";
import Message from "../schemas/message";
import User from "../schemas/user";
import Challenge from "../schemas/challenge";
import { CreateMessageRequest, IMessage } from "../types/index";

const router = express.Router();

router.get("/:id", getMessages);
router.post("/", createMessage);
router.put("/:id", updateMessage);

async function getMessages(
  req: Request<
    {},
    {},
    {},
    { empresaId?: string; emprendedorId?: string; desafioId?: string }
  >,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { empresaId, emprendedorId, desafioId } = req.query;

    const filter: any = {};
    if (empresaId) filter.empresaId = empresaId;
    if (emprendedorId) filter.emprendedorId = emprendedorId;
    if (desafioId) filter.desafioID = desafioId;

    const messages = await Message.find(filter)
      .populate({ path: "empresaId", select: "nombreEmpresa" })
      .populate({ path: "emprendedorId", select: "nombreCompleto" })
      .populate({ path: "desafioID", select: "titulo" });

    res.send(messages);
  } catch (err) {
    next(err);
  }
}

async function createMessage(
  req: Request<Record<string, never>, unknown, CreateMessageRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Mensaje creado: ", req.body);

  const { empresaId, emprendedorId, desafioId } = req.body;

  try {
    // Validar si existe la empresa
    const empresa = await User.findById(empresaId);
    if (!empresa) {
      res.status(404).send("Empresa not found");
      return;
    }
    // Validar si existe emprendedor
    const emprendedor = await User.findById(emprendedorId);
    if (!emprendedor) {
      res.status(404).send("Emprendedor not found");
      return;
    }
    // Validar si existe desafio
    const challenge = await Challenge.findById(desafioId);
    if (!challenge) {
      res.status(404).send("Desafio not found");
      return;
    }
    // Crear el mensaje 
    const messageCreated = await Message.create(req.body);

    res.send(messageCreated);
  } catch (err) {
    next(err);
  }
}

// Actualizar un desafio
async function updateMessage(
  req: Request<{ id: string }, unknown, Partial<CreateMessageRequest>>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Actualizar mensaje con id: ", req.params.id);

  try {
    const messageToUpdate = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!messageToUpdate) {
      console.error("Mensaje not found");
      res.status(404).send("Mensaje not found");
      return;
    }

    res.send(messageToUpdate);
  } catch (err) {
    next(err);
  }
}

export default router;