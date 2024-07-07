import dotenv from 'dotenv';

dotenv.config();

export const dbURI = process.env.DB_URL || "";
export const port = process.env.PORT || 5000;