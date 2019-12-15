require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const checkJwt = require("./config/checkJwt");
const routes = require("./routes");
const dbConnect = require("./config/dbConnect");
const app = express();
const port = process.env.PORT || 3003;

// Database
dbConnect();

// Middleware
app.use(cors());
app.use(helmet());
app.use(checkJwt);
app.use(express.json());

// Pass incoming calls to route handler
routes(app);

app.listen(port, () => console.log(`RichardsonRisk API running on port: ${port}!`));
