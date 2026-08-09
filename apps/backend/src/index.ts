import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoute from "./routes/auth.route";
import chatRoute from "./routes/chat.route";
import messageRoute from "./routes/message.route";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket";
const port = Number(process.env.PORT) || 5555;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

server.listen(port, () => {
  console.log(`server run port ${port}`);
});
