import { config } from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV as string;
config({ path: path.join(process.cwd(), envFile) });

export const appConfig = {
    port: process.env.PORT || 4000,
    mode: process.env.NODE_ENV === '.env.dev' ? 'dev' : 'prod',
    dbURI: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    tokenExpiry: '1H',
}
