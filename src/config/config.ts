import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

export default {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    db: {
        HOST: process.env.DB_HOST || 'localhost',
        USER: process.env.DB_USER || 'koko',
        PASSWORD: process.env.DB_PASSWORD || '',
        DATABASE: process.env.DB_DATABASE || 'sakilaa',
    },
    // other configurations...
};
