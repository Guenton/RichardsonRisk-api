const apiRouter = require("express").Router();
const subApi = require("./sub");
const buildingApi = require("./building");
const assessmentApi = require("./assessment");

apiRouter.use("/sub", subApi);
apiRouter.use("/building", buildingApi);
apiRouter.use("/assessment", assessmentApi);

module.exports = apiRouter;
