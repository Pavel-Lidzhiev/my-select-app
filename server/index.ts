import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

// --- Абсолютный путь к публичной папке ---
const publicPath = path.resolve(__dirname, "../public");
console.log("Serving static files from:", publicPath);

// Проверка файлов в public
try {
  console.log("Files in public:", fs.readdirSync(publicPath));
} catch (err) {
  console.error("Ошибка чтения public:", err);
}

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API ---
app.get("/options/for/select", (_req: Request, res: Response) => {
  const options = Array.from({ length: 1000 }, (_, i) => {
    const value = String(i + 1);
    return { name: value, value };
  });
  res.json(options);
});

app.post("/selected/option", (req: Request, res: Response) => {
  const { value } = req.body as { value?: string };
  if (!value) {
    return res
      .status(400)
      .json({ message: "Ошибка: значение опции не передано" });
  }
  res.json({ message: `Выбранная опция ${value} успешно принята.` });
});

// --- Статика фронтенда ---
app.use(express.static(publicPath));

// --- SPA fallback ---
app.get("*", (_req, res) => {
  res.sendFile("index.html", { root: publicPath });
});

// --- Запуск сервера ---
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
