const apiRouter = require("express").Router();
const subApi = require("./sub");

apiRouter.use("/sub", subApi);

module.exports = apiRouter;
