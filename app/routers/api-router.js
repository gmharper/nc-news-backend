const apiRouter = require("express").Router();

const getApi = require("../controllers/api.controller");

const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.get("/", getApi);

module.exports = apiRouter;
