import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import accountRouter from "./routes/accountRouter";
import scheduleRouter from "./routes/scheduleRouter";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors()); // allow cross-origin requests.
app.use("/", indexRouter);
app.use("/accounts", accountRouter);
app.use("/schedules", scheduleRouter);

export default app;
