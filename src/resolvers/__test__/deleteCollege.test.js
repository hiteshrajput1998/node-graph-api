/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

describe('Resolver', () => {

    beforeEach(() => {
        db();
    });

    it('deleteCollege', async () => {

        const result = await resolver.Mutation.deleteCollege(
            null,
            {
                id: '604b22f13d8db536643ee0d5'
            },
            models
        );
        expect(result).toMatchObject({ message: 'deleted successfully!', data: {} });
    });

    it('should throw error when pass wrong id', async () => {
        const request = {
            id: '606704f474fc565fa01c41'
        };

        let error;
        try {
            await resolver.collegeResolver.Mutation.deleteCollege(
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