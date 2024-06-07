import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || [
      "http://localhost:4173",
      "http://localhost:5173",
    ],
  })
);

app.use(express.json());

routes(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
