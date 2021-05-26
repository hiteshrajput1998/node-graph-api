/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

describe('GetUser Resolver', () => {
    beforeEach(() => {
        db();
    });

    it('getUser R', async () => {
        let response;
        let error;
        try {
            response = await resolver.userResolver.Query.getUser(
                null,
                { id: '606c2b812c67fe244ca16e08' },
                models
            );
        } catch (err) {
            error = err;
        }
        expect(error).toBeUndefined();
        expect(response).toMatchObject({});
    });

    it('getuser with empty response', async () => {
        let result;
        let error;
        try {
            result = await resolver.userResolver.Query.getUser(
                null,
                { id: '604f1dbd58e89347202ac5a9' },
                models
            );
        } catch (err) {
            error = err;
        }

        expect(error).toBeUndefined();
        expect(result).toMatchObject([]);
    });

    it('should throw error when passed wrong id', async () => {

        const request = {
            id: '606c2b812c67fe244ca16e'
        };

        let error;
        try {
            await resolver.userResolver.Query.getUser(
                null,
                request,
                models
            );
        } catch (err) {
            error = err;
        }
        expect(error.details[0]).toMatchObject({
            field: 'id',
            message: 'It must have a valid ObjectId.',
            code: 'Invalid id'
        });
    });
});