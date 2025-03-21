import mongoose from "mongoose";

import { app } from "./app.js";

const { PORT = 4444, DB_HOST } = process.env;


mongoose.connect(DB_HOST).
  then(() =>app.listen(PORT)).
  catch((error) => {
    console.log(error.message)
    process.exit(1)
  })