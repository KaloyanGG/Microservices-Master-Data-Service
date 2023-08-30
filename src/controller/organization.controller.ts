import { Request, Response } from "express";
import db_conn from "../database/connection";

export async function getAllOrganizations(req: Request, res: Response) {

    const query = 'SELECT * FROM organization';
    const [rows] = await db_conn.getConnection().promise().query(query);

    res.send(rows);
}

export async function getOrganizationById(req: Request, res: Response) {

    const query = 'SELECT * FROM organization WHERE registration_id = ?';
    const [rows] = await db_conn.getConnection().promise().query(query, [req.params.id]);

    if ((rows as any).length === 0) {
        res.status(404).send({ error: ' 😢 Not found' });
        return;
    }

    res.send({ rows });

}

export async function addOrganization(req: Request, res: Response) {

    type Organization = {
        name: string,
        contact_number: string,
        email: string,
    }

    const o: Organization = req.body;

    const query = 'INSERT INTO organization (name, contact_number, email) VALUES (?, ?, ?)';
    try {
        await db_conn.getConnection().promise().query(query, [o.name, o.contact_number, o.email]);
        res.send({ message: ' ✅ Organization added!' });
    } catch (e: any) {
        res.status(400).send({ error: e.message });
    }

}

export async function deleteOrganizationById(req: Request, res: Response) {

    const queryAcc = 'DELETE FROM account WHERE organization_id = ?';
    const queryOrg = 'DELETE FROM organization WHERE registration_id = ?';
    try {
        await db_conn.getConnection().promise().query(queryAcc, [req.params.id]);
        await db_conn.getConnection().promise().query(queryOrg, [req.params.id]);
        res.send({ message: ' ✅ Organization deleted!' });
    } catch (e: any) {
        res.status(400).send({ error: e.message });
    }
}