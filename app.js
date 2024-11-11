const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

// const userRoutes = {};

// const superAdminRoutes = {};

// const adminRoutes = {};

const publicRoutes = {
    chatbot: require("./app/api/public/chat-bot/router.js"),
};

const errorHandlerMiddleware = require("./app/middlewares/handle-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});

// Object.values(userRoutes).forEach((route) => app.use("/api", route));
// Object.values(superAdminRoutes).forEach((route) => app.use("/api", route));
// Object.values(adminRoutes).forEach((route) => app.use("/api", route));
Object.values(publicRoutes).forEach((route) => app.use("/api", route));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
