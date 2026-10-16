import express from "express";

const app = express(); //create the app
app.use(express.json()); //let it read JSON request bodies

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
