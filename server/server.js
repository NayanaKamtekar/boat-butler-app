const express = require("express");
const cors = require("cors");
const signupRouter = require("./api/routes/signup");
const signinRouter = require("./api/routes/signin");
const proposalsRouter = require("./api/routes/proposals");
const cancelRouter = require("./api/routes/cancel")

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
router.use("/company/signup", signupRouter);
router.use("/company/signin", signinRouter);
router.use("/company/proposals", proposalsRouter);
router.use("/company/cancel", cancelRouter);

app.use("/api", router);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
