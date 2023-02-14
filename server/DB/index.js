const mongoose = require("mongoose");

const MONGO = process.env.DB_CONNECTION_ATLAS
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to db succeed");
  })
  .catch((err) => {
    console.error("connection failed", err);
  });

module.exports = mongoose.connection;
