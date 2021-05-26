/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

describe('GetUsers Resolver', () => {

    beforeEach(() => {
        db();
    });

    it('getUsers R', async () => {
        const result = await resolver.userResolver.Query.getUsers(
            null,
            {},
            models
        );
        expect(result).toMatchSnapshot();
    });

    it('getUsers with empty response', async () => {
        const result = await resolver.userResolver.Query.getUsers(
            null,
            {},
            models
        );
        expect(result).toMatchObject([]);
    });
});