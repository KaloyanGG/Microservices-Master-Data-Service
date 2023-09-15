import { Express, Request, Response } from "express";
import { addOrganization, deleteOrganizationById, getAllOrganizations, getOrganizationById, getAllItems } from "../controller/organization.controller";

export default function registerRoutes(app: Express) {

    app.get('/', async (req: Request, res: Response) => {
        res.send('OK');
    });

    // app.get('/health', (req: Request, res: Response) => {
    //     res.send('OK');
    //     console.log(' 👨‍⚕️ Health Checked!');
    // });


    //* Main:
    app.get('/organizations', getAllOrganizations);

    app.get('/organizations/:id', getOrganizationById);

    app.get('/items', getAllItems);

    //* Extra:
    app.post('/organizations', addOrganization);

    app.delete('/organizations/:id', deleteOrganizationById);


}