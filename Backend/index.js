import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiroutes from "./routes/apiroutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;



app.use("/", apiroutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
