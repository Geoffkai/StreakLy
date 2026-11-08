import "dotenv/config";
import cors from "cors";
import express from "express";
import { pool } from "./config/db";
import { requireAuth } from "./middleware/requireAuth";

const app = express(); //create the app

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  }),
);
app.use(express.json()); //let it read JSON request bodies

app.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = res.locals.userId;
    const result = await pool.query("SELECT * FROM profiles WHERE id = $1", [
      userId,
    ]);

    if (!result.rows[0]) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/health/db", async (req, res) => {
  try {
    await pool.query("select 1");
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
