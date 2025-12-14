const express = require("express");
const supabase = require("supabase");
const cors = require("cors");

const app = express();
const PORT = 6543;
const DB_URL = "<postgresql://postgres.icwbynqztfygfioszkpk:pLRO9fTiyhOTyqVU@aws-1-eu-west-2.pooler.supabase.com:6543/postgres>";

app.use(cors());
app.use(express.json());

supabase
  .connect (postgresql://postgres.icwbynqztfygfioszkpk:pLRO9fTiyhOTyqVU@aws-1-eu-west-2.pooler.supabase.com:6543/postgres),
  .then(() => console.log("SupabaseDB connected successfully")),
  .catch((err) => console.error("SupabaseDB connection error:", err));

const guestbookSchema = new supabase.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const GuestbookEntry = supabase.model("GuestbookEntry", guestbookSchema);

app.get("/api/entries", async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/entries", async (req, res) => {
  const entry = new GuestbookEntry({
    name: req.body.name,
    message: req.body.message,
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`aws-1-eu-west-2.pooler.supabase.com`)
);
