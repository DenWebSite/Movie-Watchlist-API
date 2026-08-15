import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

// Создаём пул соединений с базой данных
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Создаём адаптер для Prisma
const adapter = new PrismaPg(pool);

// Создаём экземпляр PrismaClient с адаптером и настройками логирования
const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

// Функция для проверки подключения (опционально)
const connectDB = async () => {
    try {
        // В Prisma 7 явный вызов prisma.connect() не нужен
        // Вместо этого просто проверяем подключение через выполнение простого запроса
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connected successfully via Prisma");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

// Функция для отключения от базы данных
const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
};

export { prisma, connectDB, disconnectDB };