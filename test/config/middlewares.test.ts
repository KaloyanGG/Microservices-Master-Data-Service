
import { setupMiddlewares } from '../../src/config/middlewares';

describe('middlewares test', () => {

    it("should setup middlewares", async () => {
        const app = {
            use: jest.fn()
        };
        setupMiddlewares(app as any);
        expect(app.use).toBeCalledTimes(2);
    });

});