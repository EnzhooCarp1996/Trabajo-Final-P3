import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import statusRouter from "./routes/status";
// import authRouter from './routes/auth'
import userRouter from "./routes/user";
import challengeRouter from "./routes/challenge";
import proposalRouter from "./routes/proposal";
import messageRouter from "./routes/message";
// import authentication from './middlewares/authentication'
// import authorization from './middlewares/authorization'

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(authorization)

// Rutas principales
app.use("/", statusRouter);             // GET / y /status
app.use("/users", userRouter);          // GET /users?role=empresa
app.use("/challenges", challengeRouter); // GET /challenges?estado=activo&empresaId=123
app.use("/proposals", proposalRouter);   // GET /proposals?estado=en%20revision&emprendedorId=456
app.use("/messages", messageRouter);     // GET /messages?empresaId=...&desafioId=...

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Error:", err.message || err);
  res.status(500).send("Internal server error");
});
// app.use('/', statusRouter)
// app.use('/auth', authRouter)
// app.use('/users', authentication, userRouter)

export default app;
