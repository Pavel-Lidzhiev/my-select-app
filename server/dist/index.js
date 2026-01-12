"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 5000;
// --- Абсолютный путь к публичной папке ---
const publicPath = path_1.default.resolve(__dirname, "../public");
console.log("Serving static files from:", publicPath);
// Проверка файлов в public
try {
    console.log("Files in public:", fs_1.default.readdirSync(publicPath));
}
catch (err) {
    console.error("Ошибка чтения public:", err);
}
// --- Middleware ---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- API ---
app.get("/options/for/select", (_req, res) => {
    const options = Array.from({ length: 1000 }, (_, i) => {
        const value = String(i + 1);
        return { name: value, value };
    });
    res.json(options);
});
app.post("/selected/option", (req, res) => {
    const { value } = req.body;
    if (!value) {
        return res
            .status(400)
            .json({ message: "Ошибка: значение опции не передано" });
    }
    res.json({ message: `Выбранная опция ${value} успешно принята.` });
});
// --- Статика фронтенда ---
app.use(express_1.default.static(publicPath));
// --- SPA fallback ---
app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: publicPath });
});
// --- Запуск сервера ---
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
