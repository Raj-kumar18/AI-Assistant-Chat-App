import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json()); // This is necessary to parse JSON body in the request
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import chatRoute from "./src/routes/chat.routes.js";

// Routes
app.use("/api/vl/ai", chatRoute);



export { app };


