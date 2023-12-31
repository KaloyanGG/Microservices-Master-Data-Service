import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import dbConn from './database/connection';
import config from './config/config';
import registerRoutes from './routes/routes';
import { setupMiddlewares } from './config/middlewares';

const app: Express = express();

dotenv.config();

// .env <<< system variables (idk why), meaning that
// if you have a system variable, it will be used
// instead of the one in .env
const [host, port] = [config.host, config.port];


setupMiddlewares(app);

app.listen(port, async () => {
    try {

        registerRoutes(app);
        await dbConn.checkConnection();
        console.log(` ⚡️ Server is running at http://${host}:${port}`);
    } catch (e: any) {
        console.log(` ❌ Error: ${e.message}`);
        throw e;
    }
});


