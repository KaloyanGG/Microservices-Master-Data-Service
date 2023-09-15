
import request from 'supertest';
import express from 'express';
import registerRoutes from '../../src/routes/routes';

jest.mock('../../src/database/connection', () => {
    return {
        getConnection: jest.fn().mockReturnValue({
            promise: jest.fn().mockReturnValue({
                query: jest.fn()
            })
        })
    };
});

const app = express();
registerRoutes(app);

describe('routes test', () => {

    it("should return OK for GET /", async () => {
        await request(app)
            .get("/")
            .expect(200, 'OK');
        // expect(true);
    });

});
