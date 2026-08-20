# Movie Watchlist API

**REST API** для управления списком просмотра фильмов. Пользователи могут регистрироваться, добавлять фильмы в личный список просмотра с возможностью отслеживать статус, ставить оценки и оставлять заметки.

## Оглавление

- [Технологии](#-технологии)
- [Функциональность](#-функциональность)
- [Структура проекта](#-структура-проекта)
- [Структура базы данных](#-структура-базы-данных)
- [Установка и запуск](#-установка-и-запуск)

---

## Технологии

| Технология | Назначение |
|------------|------------|
| **Node.js** | Среда выполнения JavaScript на сервере |
| **Express.js** | Фреймворк для создания REST API |
| **PostgreSQL** | Реляционная база данных |
| **Prisma ORM** | Работа с БД через объекты |
| **Zod** | Валидации и парсинг |
| **JWT** | Аутентификация пользователей |
| **bcryptjs** | Хеширование паролей |
| **dotenv** | Управление переменными окружения |
| **nodemon** | Автоматический перезапуск сервера при изменениях |

---

## Функциональность

- **Аутентификация**
  - Регистрация пользователей
  - Вход в систему
  - JWT-токены (Bearer + HTTP-only cookies)
  - Защита приватных маршрутов через middleware

- **Работа с фильмами**
  - Добавление фильмов в каталог (только для авторизованных)
  - Получение списка всех фильмов
  - Получение списка просмотренных фильмов

- **Список просмотра**
  - Добавление фильмов в личный список
  - Защита от дублирования (нельзя добавить дважды)
  - Указание статуса просмотра (PLANNED, WATCHING, COMPLETED, DROPPED)
  - Оценка фильмов (1-10)
  - Заметки к фильмам

---

## Структура проекта

```
src/
├── config/
│   └── db.js                # Настройка Prisma Client (подключение к PostgreSQL)
│
├── controllers/
│   ├── authController.js    # Регистрация и вход пользователей
│   ├── movieController.js   # CRUD для фильмов
│   └── watchlistController.js # Управление списком просмотра
│
├── generated/
│   └── prisma/              # Prisma Client
│
├── middleware/
│   └── authMiddleware.js    # Проверка JWT-токена и защита маршрутов
│
├── routes/
│   ├── authRoutes.js        # Маршруты для register, login, logout
│   ├── movieRoutes.js       # Маршруты для фильмов
│   └── watchlistRoutes.js   # Маршруты для списка просмотра
│
├── utils/
│   └── generateToken.js     # Генерация JWT-токена и загрузка в куки
│
├── validators/
│   └── watchlistValidators.js # Zod для валидации полей
│
└── server.js                # Точка входа
```

## Структура базы данных

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
```
## Установка и запуск 

### Клонирование репозитория
```
git clone https://github.com//DenWebSite/Movie-Watchlist-API.git
```

### Переход в папку
```
cd /movie-watchlist-api
```

### Установка зависимостей
```
npm install
```

### Создайте .env и добавьте переменные
```
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
NODE_ENV="development"
JWT_SECRET=""
JWT_EXPIRES_IN=""
```

### Инициализация Prisma
```
npx prisma init
```

### Создание миграции
```
npx prisma migrate dev --name init
```

### Применение миграции к БД
```
npx prisma migrate deploy
```

### Генерация Prisma Client
```
npx prisma generate
```

### Заполните Таблицу Movies мок данными из seed.js
```
npm run seed
```

### Запуск проекта
```
npm run dev
```
