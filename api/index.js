const express = require("express");
const app = express();
const port = 3000;
const administratorRouter = require("./routes/administrator");
const eventRouter = require("./routes/event");
const featuresRouter = require("./routes/features");
const features_spRouter = require("./routes/features_sp");
const has_friendRouter = require("./routes/has_friend");
const modifyRouter = require("./routes/modify");
const monthly_statsRouter = require("./routes/monthly_stats");
const notesRouter = require("./routes/notes");
const profileRouter = require("./routes/profile");
const reminderRouter = require("./routes/reminder");
const scheduleRouter = require("./routes/schedule");
const send_reportRouter = require("./routes/send_report");
const settingsRouter = require("./routes/settings");
const taskRouter = require("./routes/task");
const task_listRouter = require("./routes/task_list");
const usage_statisticsRouter = require("./routes/usage_statistics");
const userRouter = require("./routes/user");
const viewRouter = require("./routes/view");
const yearlyRouter = require("./routes/yearly");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/administrator", administratorRouter);
app.use("/event", eventRouter);
app.use("/features", featuresRouter);
app.use("/features_sp", features_spRouter);
app.use("/has_friend", has_friendRouter);
app.use("/modify", modifyRouter);
app.use("/monthly_stats", monthly_statsRouter);
app.use("/notes", notesRouter);
app.use("/profile", profileRouter);
app.use("/reminder", reminderRouter);
app.use("/schedule", scheduleRouter);
app.use("/send_report", send_reportRouter);
app.use("/settings", settingsRouter);
app.use("/task", taskRouter);
app.use("/task_list", task_listRouter);
app.use("/usage_statistics", usage_statisticsRouter);
app.use("/user", userRouter);
app.use("/view", viewRouter);
app.use("/yearly", yearlyRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
