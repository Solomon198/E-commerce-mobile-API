import * as mongoose from "mongoose";

const ExpressBrute: mongoose.Schema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    data: {
      count: mongoose.Schema.Types.Number,
      lastRequest: mongoose.Schema.Types.Date,
      firstRequest: mongoose.Schema.Types.Date,
    },
    expires: {
      type: mongoose.Schema.Types.Date,
      index: { expires: "1d" },
    },
  },
  { autoIndex: false },
);

export default mongoose.model("bruteforce", ExpressBrute);
