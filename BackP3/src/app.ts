import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import statusRouter from "./routes/status";
import authRouter from './routes/auth'
import userRouter from "./routes/user";
import challengeRouter from "./routes/challenge";
import proposalRouter from "./routes/proposal";
import messageRouter from "./routes/message";
import { errorHandler } from "./middlewares/errorHandler";
import authentication from "./middlewares/authentication";
import authorization from "./middlewares/authorization";
// import authentication from './middlewares/authentication'
// import authorization from './middlewares/authorization'

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authorization)

// Rutas principales
app.use("/", statusRouter);             // GET / y /status
app.use('/auth', authRouter)
app.use("/users", authentication, userRouter);          // GET /users?role=empresa
app.use("/challenges", authentication, challengeRouter); // GET /challenges?estado=activo&empresaId=123
app.use("/proposals", authentication, proposalRouter);   // GET /proposals?estado=en%20revision&emprendedorId=456
app.use("/messages", authentication, messageRouter);     // GET /messages?empresaId=...&desafioId=...

// app.use('/auth', authRouter)
// app.use('/users', authentication, userRouter)
app.use(errorHandler);
export default app;
