# Select App Monorepo

Тестовый проект с кастомным компонентом **Select** и клиент–серверной архитектурой.

Проект реализован как монорепозиторий и предназначен для демонстрации работы с React, TypeScript и асинхронным API.

---

## Структура проекта

```
/
 ├─ client        # React + TypeScript (frontend)
 ├─ server        # Node.js + Express (backend)
 └─ package.json  # корневые скрипты для запуска и сборки
```

Все команды ниже выполняются **из корня репозитория**, если не указано иное.

---

## Требования

- Node.js >= 18
- npm >= 9

Проверка версий:

```bash
node -v
npm -v
```

---

## Установка

Клонировать репозиторий:

```bash
git clone <repo-url>
cd select_app_monorepo
```

Установить зависимости:

```bash
cd client && npm install
cd ../server && npm install
cd ..
```

---

## Запуск (development)

Одновременный запуск клиента и сервера:

```bash
npm run dev
```

Команда запускает **frontend и backend параллельно**.

По умолчанию:
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

---

## Сборка

Собрать клиент и сервер:

```bash
npm run build
```

Или по отдельности:

```bash
npm run build:client
npm run build:server
```

---

## Запуск production-сервера

После сборки:

```bash
npm run start
```

---

## API

### Получение списка опций

```
GET /options/for/select
```

Ответ:

```json
[
  { "name": "1", "value": "1" },
  { "name": "2", "value": "2" }
]
```

(возвращается 1000+ элементов)

---

### Отправка выбранного значения

```
POST /selected/option
```

Body:

```json
{
  "value": "123"
}
```

---

## Кратко о реализации

- Полностью кастомный Select (без использования `<select>` и `<button>`)
- Асинхронная загрузка 1000+ опций с сервера
- Фильтрация списка
- Клавиатурная навигация (ArrowUp / ArrowDown / Enter / Escape)
- Виртуализация списка опций
- React + TypeScript
- Redux Toolkit для управления состоянием
- Backend на Express

---

## Для проверяющего

Проект запускается одной командой:

```bash
npm run dev
```

Вся логика, структура и инструкции находятся в репозитории.

