

import mysql, { Connection } from 'mysql2';
import config from '../../src/config/config';
import db_conn from '../../src/database/connection';

jest.mock('mysql2', () => {
    return {
        createConnection: jest.fn(() => ({
            promise: () => ({
                query: jest.fn().mockImplementation((query: string) => {
                    if (query === 'SELECT 1') {
                        return Promise.resolve([[{ 1: 1 }]]);
                    }
                }),
            }),
            end: jest.fn()
        }))
    };
});



describe('DatabaseConnection', () => {
    // afterAll(() => {
    //     // Clean up to remove the static instance so future tests aren't affected
    //     // by any modifications we make.
    //     delete DatabaseConnection.instance;
    // });

    it('Get connection works', () => {
        const connection: Connection = db_conn.getConnection();
        expect(connection).toBeDefined();
    });

    it('Check connection works', async () => {
        await db_conn.checkConnection();
        expect(mysql.createConnection).toBeCalled();
    });

    it('should handle exit event', () => {
        const spy = jest.spyOn(db_conn.getConnection(), 'end');
        process.emit('exit', 0);
        expect(spy).toHaveBeenCalled();
    });

    it('should send exit event on SIGINT', () => {

        const spy = jest.spyOn(process, 'exit').mockImplementation((() => {
            return undefined as never;
        }));

        process.emit('SIGINT');
        expect(spy).toHaveBeenCalledWith(0);
    });

});