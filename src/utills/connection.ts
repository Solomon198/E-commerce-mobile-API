import * as mongoose from "mongoose";
import Configs from "../core/enivronment.config";

mongoose
  .connect(Configs().DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // autoReconnect: true,
    keepAlive: true,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 450000,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log("database not connected");
  });

const db = mongoose.connection;

export default db;
