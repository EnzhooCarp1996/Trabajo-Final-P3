import express, { Request, Response, NextFunction } from "express";

import User from "@/schemas/user";
import Role from "@/schemas/role";
import { CreateUserRequest } from "@/types";
import { validateIdParam } from "@/middlewares/validateId";

const router = express.Router();

router.get("/", getAllUsersByRole);
router.get("/:id", validateIdParam, getUserById);
router.post("/", createUser);
router.put("/:id", validateIdParam, updateUser);
router.delete("/:id", validateIdParam, deleteUser);

async function getAllUsersByRole(
  req: Request<{}, {}, {}, { role?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Obtener todos los usuarios por rol ", req.user?._id);

  const { role } = req.query;

  // Validar el rol
  if (!role || !["empresa", "emprendedor"].includes(role)) {
    res.status(400).send("Role inválido. Debe ser 'empresa' o 'emprendedor'.");
    return;
  }

  try {
    const users = await User.find({ activo: true }).populate({
      path: "role",
      match: { nombre: role },
    });

    const filteredUsers = users.filter(u => u.role);

    res.send(filteredUsers);
  } catch (err) {
    next(err);
  }
}

async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Obtener usuario con id: ", req.params.id);

  try {
    const user = await User.findById(req.params.id).populate("role");

    if (!user) {
      console.error("User not found");
      res.status(404).send("User not found");
      return;
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(
  req: Request<Record<string, never>, unknown, CreateUserRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Usuario creado: ", req.body);

  const user = req.body;

  try {
    const role = await Role.findOne({ nombre: user.role });
    if (!role) {
      console.error("Role not found");
      res.status(404).send("Role not found");
      return;
    }

    const userCreated = await User.create({
      ...user,
      role: role._id,
    });

    res.send(userCreated);
  } catch (err) {
    next(err);
  }
}

async function updateUser(
  req: Request<{ id: string }, unknown, Partial<CreateUserRequest>>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Actualizar usuario con id: ", req.params.id);

  // Solo el admin o el propio usuario puede modificar sus datos
  if (!req.isAdmin?.() && req.params.id !== req.user?._id) {
    res.status(503).send("Unauthorized");
    return;
  }

  // No se puede actualizar el correo electrónico.
  delete req.body.email;

  try {
    const userToUpdate = await User.findById(req.params.id);

    if (!userToUpdate) {
      console.error("Usuario not found");
      res.status(404).send("Usuario not found");
      return;
    }

    // Asigna los nuevos valores (solo los que vengan)
    Object.assign(userToUpdate, req.body);
    // Dispara el pre('save') y hashea si cambió la contraseña
    await userToUpdate.save();

    res.send(userToUpdate);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.log("Usuario eliminado con id: ", req.params.id);

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    await User.deleteOne({ _id: user._id });

    res.send(`Usuario eliminado:  ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

export default router;
