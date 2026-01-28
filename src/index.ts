import express from "express";
import subjectsRouter from "./routes/subjects";
import cors from "cors";

const app = express();
const PORT = 8000;
if(!process.env.FRONTEND_URL) {
    throw new Error("Missing FRONTEND_URL");
}

app.use(cors ({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());

app.use('/api/subjects', subjectsRouter)

app.get('/', (req, res) => {
    res.send("Welcome to the classroom API!");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})