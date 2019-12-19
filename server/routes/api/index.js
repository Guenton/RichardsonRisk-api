const apiRouter = require("express").Router();
const subApi = require("./sub");
const buildingApi = require("./building");

apiRouter.use("/sub", subApi);
apiRouter.use("/building", buildingApi);

module.exports = apiRouter;
