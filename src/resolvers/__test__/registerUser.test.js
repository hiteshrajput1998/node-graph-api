/* eslint-disable no-undef */
import resolver from '../User';
import db from '../../config/db';
// import * as utils from '../../utils';

// describe('Validated requests', async () => {
//     beforeEach(() => {
//         db();
//     });

//     it('called validateRequestData', async () => {
//         const errMessage = 'Error while validataRequestData';

//         const validateReqDataSpy = jest.spyOn(utils, 'validateRequestData').mockImplementation(() => {
//             throw errMessage
//         });

//         console.log(object);

//         const inputRegister = {
//             userName: '',
//             email: 'hr@gmail.com',
//             password: 'hr123',
//             created: '2021'
//         };
//         const res = await resolver.Mutation.registerUser({}, { inputRegister });
//         console.log(`res: ${JSON.stringify(res)}`);
//         await expect(resolver.Mutation.registerUser({}, { inputRegister })).rejects.toMatch(errMessage);
//         //expect(validateReqDataSpy).toBeCalledTimes(1);
//     });
// });


describe('Register resolver', () => {
    beforeEach(() => {
        db();
    });

    it('Should register user', async () => {
        const inputRegister = {
            userName: 'HRR5',
            email: 'hr@gmail.com',
            password: 'hr123',
            created: '2021'
        };

        const expectedResult = {
            message: 'Registered successfully!',
            data: {}
        };

        await resolver.Mutation.registerUser({}, { inputRegister }).then(data => {
            expect(data).toMatchObject(expectedResult);
        });

    });
});

describe('Register resolver should throw error while', () => {
    beforeEach(() => {
        db();
    });

    it('Should throw when user exist', async () => {
        const inputRegister = {
            userName: 'HR7',
            password: 'hr123',
            email: 'hr@gmail.com',
            created: '2021-03-19'
        };

        const expectedResult = 'Error: User already exist';

        await resolver.Mutation.registerUser({}, { inputRegister })
            .then(res => {
                expect(res).to.not.be.instanceOf(expectedResult);
            })
            .catch(err => {
                expect(err.toString()).toBe(expectedResult);
            });
    });
});