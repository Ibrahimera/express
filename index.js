const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./members");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) =>
  res.render("index", {
    title: "Express App",
    members,
  })
);
app.use("/api/members", require("./routes/route"));
// app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));
