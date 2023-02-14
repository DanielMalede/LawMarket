require("dotenv").config();
require("./DB");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
console.log(process.env.SECRET_EMAIL_KEY);
app.use("/lawyer", require("./routes/lawyerRouter"));
app.use("/category", require("./routes/categoryRouter"));
app.use("/review", require("./routes/reviewRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/emailHandler", require("./routes/emailRouter"));

app.get("/", (req, res) => {
  res.send("server online "); 
});
app.listen(process.env.PORT, () => {
  console.log(`listen to port : ${process.env.PORT}, in http://lawmarket-env.eba-dra6feth.us-east-1.elasticbeanstalk.com/`);
});
