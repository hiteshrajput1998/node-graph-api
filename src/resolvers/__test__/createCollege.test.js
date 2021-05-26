/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

let inputField = {
    name: 'HRR',
    address: 'Maninagar'
};

describe('Resolver', () => {

    beforeEach(() => {
        db();
    });

    it('createCollege', async () => {
        const result = await resolver.Mutation.createCollege(
            null,
            { input: inputField },
            models
        );
        expect(result).toMatchObject({ message: 'created successfully!', data: {} });
    });
});