const express = require("express");
const app = express();

const port = 3001;

const administrator_Router = require("./routes/administrator");
const event_Router = require("./routes/event");
const features_Router = require("./routes/features");
const has_friend_Router = require("./routes/has_friend");
const monthly_stats_Router = require("./routes/monthly_stats");
const note_Router = require("./routes/note");
const notes_Router = require("./routes/notes");
const profile_Router = require("./routes/profile");
const schedule_Router = require("./routes/schedule");
const settings_Router = require("./routes/settings");
const shared_features_Router = require("./routes/shared_features");
const task_Router = require("./routes/task");
const tasks_Router = require("./routes/tasks");

//added cors to allow api fetch and post 
const cors = require("cors");
app.use(cors());

app.use(express.json());
//Express framework being URL encoded.
app.use(express.urlencoded({extended: true,}));
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/administrator", administrator_Router);
app.use("/event", event_Router);
app.use("/features", features_Router);
app.use("/has_friend", has_friend_Router);
app.use("/monthly_stats", monthly_stats_Router);
app.use("/note", note_Router);
app.use("/notes", notes_Router);
app.use("/profile", profile_Router);
app.use("/schedule", schedule_Router);
app.use("/settings", settings_Router);
app.use("/shared_features", shared_features_Router);
app.use("/task", task_Router);
app.use("/tasks", tasks_Router);

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
