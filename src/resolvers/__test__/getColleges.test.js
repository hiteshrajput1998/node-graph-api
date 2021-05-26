/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

describe('Resolver', () => {

    beforeEach(() => {
        db();
    });

    it('getColleges2', async () => {
        const result = await resolver.collegeResolver.Query.getcolleges(
            null,
            {},
            models
        );
        expect(result).not.toBeUndefined();
        if (result.length > 0) {
            expect(result[0]).toMatchSnapshot({
                collegeName: expect.any(String),
                address: expect.any(String)
            });
        }
    });

    it('getColleges with empty response', async () => {
        const result = await resolver.collegeResolver.Query.getcolleges(
            null,
            {},
            models
        );
        expect(result).not.toBeUndefined();
        expect(result).toEqual([]);
    });
});