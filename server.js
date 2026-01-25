const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/time", (_req, res) => res.json({ now: new Date().toISOString() }));
app.get("/", (_req, res) => res.json({ message: "Welcome to DevBank API" }));

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
