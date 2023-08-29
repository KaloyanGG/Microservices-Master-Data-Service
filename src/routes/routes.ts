import { Express, Request, Response } from "express";
import db_conn from "../database/connection";

export default function registerRoutes(app: Express) {

    app.get('/', async (req: Request, res: Response) => {


        const query = 'SELECT * FROM people';
        const [rows, fields] = await db_conn.getConnection().promise().query(query);

        res.send({ rows, fields });
        //TODO: make the original db now

        // res.send('Hi');
        console.log(' 📧 Response sent!');
    });

    app.get('/health', (req: Request, res: Response) => {
        res.send('OK');
        console.log(' 👨‍⚕️ Health Checked!');
    });

    



}