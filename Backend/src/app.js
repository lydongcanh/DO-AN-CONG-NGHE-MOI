import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index-router";
import accountRouter from "./routes/account-router";
import scheduleRouter from "./routes/schedule-router";
import scoreboardRouter from "./routes/scoreboard-router";
import scoreRouter from "./routes/score-router";
import studentRouter from "./routes/student-router";
import studyclassRouter from "./routes/studyclass-router";
import subjectRouter from "./routes/subject-router";
import teacherRouter from "./routes/teacher-router";

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
