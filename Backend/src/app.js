import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import accountRouter from "./routes/accountRouter";
import scheduleRouter from "./routes/scheduleRouter";
import scoreboardRouter from "./routes/scoreboardRouter";
import scoreRouter from "./routes/scoreRouter";
import studentRouter from "./routes/studentRouter";
import studyclassRouter from "./routes/studyclassRouter";
import subjectRouter from "./routes/subjectRouter";
import teacherRouter from "./routes/teacherRouter";

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
app.use("/scoreboards", scoreboardRouter);
app.use("/scores", scoreRouter);
app.use("/students", studentRouter);
app.use("/studyclasses", studyclassRouter);
app.use("/subjects", subjectRouter);
app.use("/teachers", teacherRouter);

export default app;
