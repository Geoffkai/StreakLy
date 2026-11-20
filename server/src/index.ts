import "dotenv/config";
import cors from "cors";
import express from "express";
import { pool } from "./config/db";
import { requireAuth } from "./middleware/requireAuth";
import { DatabaseError } from "pg";

const app = express(); //create the app

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  }),
);
app.use(express.json()); //let it read JSON request bodies

app.get("/me", requireAuth, async (_req, res) => {
  try {
    const userId = res.locals.userId;
    const result = await pool.query("SELECT name FROM profiles WHERE id = $1", [
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

app.get("/subjects", requireAuth, async (_req, res) => {
  try {
    const userId = res.locals.userId;
    const result = await pool.query(
      "SELECT id, name, is_archived FROM subjects WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );

    return res.status(200).json({ subjects: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

app.post("/subjects", requireAuth, async (req, res) => {
  try {
    const subjectCleanName =
      typeof req.body?.name === "string" ? req.body.name.trim() : null;
    const userId = res.locals.userId;

    if (!subjectCleanName) {
      return res.status(422).json({ message: "Wrong or invalid name format" });
    }

    const result = await pool.query(
      "INSERT INTO subjects (name, user_id) VALUES ($1, $2) RETURNING id, name, is_archived",
      [subjectCleanName, userId],
    );

    return res.status(201).json({ subject: result.rows[0] });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      return res.status(409).json({ message: "Subject already exists" });
    }
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

app.patch("/subjects/:id", requireAuth, async (req, res) => {
  try {
    const updatedCleanName =
      typeof req.body?.name === "string" ? req.body.name.trim() : null;
    const userId = res.locals.userId;
    const subjectId = req.params.id;

    if (!updatedCleanName) {
      return res.status(422).json({ message: "Wrong or invalid name format" });
    }

    const result = await pool.query(
      "UPDATE subjects SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, is_archived",
      [updatedCleanName, subjectId, userId],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: "No match found" });
    }
    return res.status(200).json({ subject: result.rows[0] });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      return res.status(409).json({ message: "Subject already exists" });
    }
    if (err instanceof DatabaseError && err.code === "22P02") {
      return res.status(404).json({ message: "No match found" });
    }
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
