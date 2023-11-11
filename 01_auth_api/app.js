const express = require("express");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
