import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import router from "./routes/step1.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// app.use("/api", step1)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
