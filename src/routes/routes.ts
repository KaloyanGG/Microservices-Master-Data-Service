import { Express, Request, Response } from "express";
import { addOrganization, deleteOrganizationById, getAllOrganizations, getOrganizationById } from "../controller/organization.controller";

export default function registerRoutes(app: Express) {

    app.get('/', async (req: Request, res: Response) => {
        res.send('OK');
    });

    app.get('/health', (req: Request, res: Response) => {
        res.send('OK');
        console.log(' 👨‍⚕️ Health Checked!');
    });

    //* Real things now:

    //allorganizations:
    app.get('/organizations', getAllOrganizations);

    app.get('/organizations/:id', getOrganizationById);

    app.post('/organizations', addOrganization);

    app.delete('/organizations/:id', deleteOrganizationById);



}