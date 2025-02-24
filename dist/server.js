import "express-async-errors";
import express from "express";
import cors from 'cors';
import server_config from './config/server';
import { routes } from "./routes/index";
import { errorMiddleware } from "./middlewares/errorMiddleware";
const app = express();
const port = Number.parseInt(server_config.port);
const hostname = server_config.host;
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
