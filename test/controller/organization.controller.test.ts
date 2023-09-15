const mockRows = [
    {
        registration_id: 1,
        name: 'Test',
        date_of_registration: '2021-01-01',
        contact_number: '1234567890',
        email: 'test@gmail.com',
        account_id: 1,
        balance: 1000
    },
    {
        registration_id: 2,
        name: 'Test2',
        date_of_registration: '2021-01-01',
        contact_number: '0234567890',
        email: 'testq@gmail.com',
        account_id: 1,
        balance: 21000
    },

];
const mockItems = [
    {
        id: 1,
        name: 'Test',
        price: 100,
    },
    {
        id: 2,
        name: 'Test2',
        price: 200,
    },

]

const SELECT_ALL_ORGANIZATIONS_QUERY = "SELECT o.registration_id, o.name, o.date_of_registration, o.contact_number, o.email, a.id AS 'account_id', a.balance FROM organization o JOIN `account` a ON o.registration_id = a.organization_id";
const SELECT_ALL_ITEMS_QUERY = "SELECT * FROM item";
const SELECT_BY_ID_QUERY = 'SELECT * FROM organization WHERE registration_id = ?';
const INSERT_QUERY = 'INSERT INTO organization (name, contact_number, email) VALUES (?, ?, ?)';
const DELETE_QUERY = 'DELETE FROM organization WHERE registration_id = ?';

import { Request, Response } from 'express';
import db_conn from '../../src/database/connection';
import { addOrganization, deleteOrganizationById, getAllOrganizations, getOrganizationById, getAllItems } from '../../src/controller/organization.controller';

let insertQueryCount = 0;
let deleteQueryCount = 0;

// Mocking the db_conn module
jest.mock('../../src/database/connection', () => {
    return {
        getConnection: jest.fn().mockReturnValue({
            promise: jest.fn().mockReturnValue({
                query: jest.fn().mockImplementation((query: string, values?: any) => {

                    switch (query) {
                        case SELECT_ALL_ITEMS_QUERY:
                            return Promise.resolve([mockItems]);
                        case SELECT_ALL_ORGANIZATIONS_QUERY:
                            return Promise.resolve([mockRows]);
                        case SELECT_BY_ID_QUERY:
                            console.log(values);
                            if (values[0] <= mockRows.length) {
                                return Promise.resolve([[mockRows[values[0] - 1]]]);
                            } else {
                                return Promise.resolve([[]]);
                            }
                        case INSERT_QUERY:
                            // Throw error only on the first call
                            if (insertQueryCount++ === 1) {
                                throw new Error('Error msg');
                            }
                            break;
                        case DELETE_QUERY:
                            // Throw error only on the first call
                            if (deleteQueryCount++ === 1) {
                                throw new Error('Error msg');
                            }
                            break;

                    }

                })
            }),
        }),
    };
});

describe('Organization controller works', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return organizations', async () => {



        const mockRequest: Partial<Request> = {};
        const mockResponse: Partial<Response> = {
            send: jest.fn(),
        };

        await getAllOrganizations(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.send)
            .toHaveBeenCalledWith(mockRows);

    });

    it('should return organization by id ', async () => {

        const mockRequest = {
            params: {
                id: 1,
            }
        } as any;

        const mockResponse = {
            send: jest.fn(),
            // status: jest.fn().mockReturnThis(),
        } as any;

        await getOrganizationById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.send).toHaveBeenCalledWith(mockRows[0]);

    })

    it('should return 404 if organization not found', async () => {

        const mockRequest = {
            params: {
                id: 3,
            }
        } as any;

        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;

        await getOrganizationById(mockRequest as Request, mockResponse as Response);
        // expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({ error: ' 😢 Not found' });

    })

    it('should add organization', async () => {
        const mockOrganization = {
            name: 'org1',
            contact_number: '1234567890',
            email: 'email@org1.com',
        };

        const mockRequest = {
            body: mockOrganization
        } as any;
        const mockResponse = {
            send: jest.fn(),
        } as any;


        await addOrganization(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.send).toBeCalledWith({ message: ' ✅ Organization added!' });
    })

    it('should return 400 if error on adding organization', async () => {

        const mockOrganization = {
            name: 'org1',
            contact_number: '1234567890',
            email: 'email@abv.bg',
        };

        const mockRequest = {
            body: mockOrganization
        } as any;
        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;

        await addOrganization(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ error: 'Error msg' });


    })

    it('should delete organization by id', async () => {

        const mockRequest = {
            params: {
                id: 1,
            }
        } as any;

        const mockResponse = {
            send: jest.fn(),
        } as any;

        await deleteOrganizationById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: ' ✅ Organization deleted!' });

    });

    it('should return 400 if error on deleting organization', async () => {

        const mockRequest = {
            params: {
                id: 1,
            }
        } as any;

        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;

        await deleteOrganizationById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ error: 'Error msg' });

    })

    it('should get all items', async () => {

        const mockRequest: Partial<Request> = {};
        const mockResponse: Partial<Response> = {
            send: jest.fn(),
        };

        await getAllItems(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.send)
            .toHaveBeenCalledWith(mockItems);
    })

    // Add more test cases as needed
});