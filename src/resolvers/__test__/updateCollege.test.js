/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

const inputField = {
    collegeName: 'ABC',
    address: 'Navrangpura'
};

describe('Resolver', () => {

    beforeEach(() => {
        db();
    });

    it('updateCollege', async () => {
        const result = await resolver.Mutation.updateCollege(
            null,
            {
                id: '604b237c439f464ea48d19e7',
                input: inputField
            },
            models
        );
        expect(result).toMatchObject({ message: 'updated successfully!', data: {} });
    });

    it('should throw error when pass wrong id', async () => {
        const request = {
            id: '606c2b812c67fe244ca16e',
            input: inputField
        };

        let error;
        try {
            await resolver.collegeResolver.Mutation.updateCollege(
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