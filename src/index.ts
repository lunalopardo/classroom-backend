import AgentAPI from "apminsight";
AgentAPI.config();

import express from "express";
import cors from "cors";

import securityMiddleware from "./middleware/security.js";
import subjectsRouter from "./routes/subjects.js";
import usersRouter from "./routes/users.js";
import classesRouter from "./routes/classes.js";


import {auth} from "./lib/auth.js";
import {toNodeHandler} from "better-auth/node";

const app = express();
const PORT = 8000;


if(!process.env.FRONTEND_URL) {
    throw new Error("Missing FRONTEND_URL");
}

app.use(cors ({
    origin: [
        "http://localhost:5173",
        "https://classroom-frontend-sage.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter)
app.use('/api/users', usersRouter)
app.use('/api/classes', classesRouter)

app.get('/', (req, res) => {
    res.send("Welcome to the classroom API!");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})