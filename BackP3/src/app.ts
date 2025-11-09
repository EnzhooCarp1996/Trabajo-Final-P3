import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

// var createError = require("http-errors");
// var path = require("path");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(authorization)

// app.use('/', statusRouter)
// app.use('/auth', authRouter)
// app.use('/users', authentication, userRouter)

export default app;
