/* eslint-disable no-undef */
import resolver from '../index';
import models from '../../models';
import db from '../../config/db';
// import * as utils from '../../utils';

describe('Resolver', () => {
    beforeEach(() => {
        db();
    });

    it('called validateRequestData', async () => {
        const errMessage = 'Error while validataRequestData';

        // const validateReqDataSpy = jest.spyOn(utils, 'validateRequestData').mockImplementation(() => {
        //     throw errMessage;
        // });

        try {
            const res = await resolver.collegeResolver.Query.getCollege(
                null,
                { id: '606c2b812c67fe244ca16e08' },
                models
            );
            console.log(`res: ${JSON.stringify(res)}`);
            await expect(res).rejects.toMatch(errMessage);
            //expect(validateReqDataSpy).toBeCalledTimes(1);
        } catch (error) {
            //console.log(error);
        }
    });

    it('getCollege', async () => {
        let response;
        let error;
        try {
            response = await resolver.collegeResolver.Query.getCollege(
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

    it('getCollege with empty response', async () => {
        let result;
        let error;
        try {
            result = await resolver.collegeResolver.Query.getCollege(
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
            await resolver.collegeResolver.Query.getCollege(
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