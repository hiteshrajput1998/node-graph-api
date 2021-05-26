/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';

describe('deleteColleges resolver', () => {

    beforeEach(() => {
        db();
    });

    it('should pass deleteColleges', async () => {

        const ids = ['6076e89376a1d057ac8f7214'];
        const result = await resolver.collegeResolver.Mutation.deleteColleges(
            null,
            {
                ids: ids
            },
            models
        );
        expect(result).toMatchObject({ message: `${ids.length} document(s) deleted` });
    });

    it('throw error when data not exists', async () => {

        const expectedResult = 'Error: Error: data is not exist';
        const request = {
            ids: ['6076e8ab76a1d057ac8f7217', '6076e8a576a1d057ac8f7216']
        };

        await resolver.collegeResolver.Mutation.deleteColleges(
            null,
            request,
            models
        ).then(res => {
            console.log(res);
        }).catch(err => {
            expect(err.toString()).toBe(expectedResult);
        });
    });

    it('should throw error when pass wrong id', async () => {

        let request = {
            ids: ['6076e8ab76a1d057ac8e72er','6076e8ab76a1d057ac8e72er']
        };
        let errorObj = {
            field: 'ids',
            message: 'It must have a valid ObjectId.',
            code: 'Invalid ids'
        };

        await resolver.collegeResolver.Mutation.deleteColleges(
            null,
            request,
            models
        ).then(res => { res; })
            .catch(err => {
                expect(err.details[0]).toMatchObject(errorObj);
            });
    });
});