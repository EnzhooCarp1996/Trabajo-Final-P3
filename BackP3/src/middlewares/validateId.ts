import { Request, Response, NextFunction } from "express";

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (!req.params.id) {
    return res.status(404).send("Parameter id not found");
  }
  next();
}
