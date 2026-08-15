# 🎬 Movie Watchlist API

**REST API** для управления списком просмотра фильмов. Пользователи могут регистрироваться, добавлять фильмы в личный список просмотра с возможностью отслеживать статус, ставить оценки и оставлять заметки.

## 📋 Оглавление

- [Технологии](#-технологии)
- [Функциональность](#-функциональность)
- [Структура базы данных](#-структура-базы-данных)
- [API Эндпоинты](#-api-эндпоинты)
- [Установка и запуск](#-установка-и-запуск)
- [Переменные окружения](#-переменные-окружения)
- [Команды](#-команды)
- [Примеры запросов](#-примеры-запросов)
- [Структура проекта](#-структура-проекта)
- [Планы по развитию](#-планы-по-развитию)

---

## 🛠 Технологии

| Технология | Назначение |
|------------|------------|
| **Node.js** | Среда выполнения JavaScript на сервере |
| **Express.js** | Фреймворк для создания REST API |
| **PostgreSQL** | Реляционная база данных |
| **Prisma ORM** | Работа с БД через объекты |
| **JWT** | Аутентификация пользователей |
| **bcryptjs** | Хеширование паролей |
| **dotenv** | Управление переменными окружения |
| **nodemon** | Автоматический перезапуск сервера при изменениях |

---

## 🎯 Функциональность

- **Аутентификация**
  - Регистрация пользователей
  - Вход в систему
  - JWT-токены (Bearer + HTTP-only cookies)
  - Защита приватных маршрутов через middleware

- **Работа с фильмами**
  - Добавление фильмов в каталог (только для авторизованных)
  - Получение списка всех фильмов

- **Список просмотра**
  - Добавление фильмов в личный список
  - Защита от дублирования (нельзя добавить дважды)
  - Указание статуса просмотра (PLANNED, WATCHING, COMPLETED, DROPPED)
  - Оценка фильмов (1-10)
  - Заметки к фильмам

---

## 🗄 Структура базы данных

### Модели

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
  createAt DateTime @default(now())
  
  movies Movie[] @relation("MovieCreator")
  watchlistItems WatchlistItem[]
}

model Movie {
  id          String   @id @default(uuid())
  title       String
  overview    String?
  releaseYear Int
  genres      String[] @default([])
  runtime     Int?
  posterUrl   String?
  createdBy   String
  createdAt   DateTime @default(now())
  
  creator User @relation("MovieCreator", fields: [createdBy], references: [id])
  watchlistItems WatchlistItem[]
}

model WatchlistItem {
  userId    String
  movieId   String
  status    WatchlistStatus @default(PLANNED)
  rating    Int?
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  
  user  User  @relation(fields: [userId], references: [id])
  movie Movie @relation(fields: [movieId], references: [id])
  
  @@id([userId, movieId])
}

enum WatchlistStatus {
  PLANNED    // Запланировано
  WATCHING   // Смотрю
  COMPLETED  // Просмотрено
  DROPPED    // Брошено
}
