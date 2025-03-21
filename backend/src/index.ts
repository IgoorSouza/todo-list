import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || [
      "http://localhost:4173",
      "http://localhost:5173",
    ],
  })
);

routes(app);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}!`));
