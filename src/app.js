const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the sever");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Mithilesh", LastName: "Deore" });
});

app.delete("/user", (req, res) => {
  res.send("User deleted");
});

app.patch("/user", (req, res) => {
  res.send("User updated");
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to DB");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello");
});

app.listen(3000, () => {
  console.log("Server is successfully on port on 3000...");
});
