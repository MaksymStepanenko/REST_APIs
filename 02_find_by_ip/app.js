const express = require("express");
const router = require("./route/router");

const app = express();
const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
