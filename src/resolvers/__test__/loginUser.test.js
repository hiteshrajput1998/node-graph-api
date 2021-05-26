/* eslint-disable no-undef */
import resolver from '../User/index';
import db from '../../config/db';

describe('Login resolver should login', () => {
    beforeEach(() => {
        db();
    });

    it('Should login user', async () => {
        const data2 = 'U2FsdGVkX1+Qrgb77cS2mqGKLOJWo0aR4bpRvdpslgVAmB/m1f7ELWJavC3ftRhFUZSsHniCIMuM36kJ2fB7GQ==';

        const expectedResult = {
            token: 'U2FsdGVkX1/7rBq4Yd2SYQr+zBYQx25cMhkMnp/3sXI='
        };

        await resolver.Mutation.loginUser({}, { data2 }).then(data => {
            expect(data).toMatchObject(expectedResult);
        }).catch(err => {
            console.log(err.toString());
        });
    });
});



describe('Login resolver should throw error', () => {
    beforeEach(() => {
        db();
    });

    it('Should throw error when password is wrong!', async () => {
        const data2 = 'U2FsdGVkX195b4n8b2rKTNClHix784uk7scbVuSTpPcWEAKse7o+0AwIZaSWlut6zIyW6yVmnv5/mZ/XLRRZcQ==';

        const expectedError = 'Error: Incorrect password!';

        await resolver.Mutation.loginUser({}, { data2 })
            .then(res => {
                console.log(res);
            }).catch(err => {
                expect(err.toString()).toBe(expectedError);
            });
    });

    it('Should throw error when header is wrong!', async () => {
        const data2 = 'U2FsdGVkX195b4n8b2rKTNClHix784uk7scbVuSTpPcWEAKse7o+0AwIZaSWlut6zIyW6yVmnv5/mZ==';

        const expectedError = 'Error: Invalid pass header!';

        await resolver.Mutation.loginUser({}, { data2 })
            .then(res => {
                console.log(res);
            }).catch(err => {
                expect(err.toString()).toBe(expectedError);
            });
    });

    it('Should throw error when user not found', async () => {
        const data2 = 'U2FsdGVkX1/rCRHgiBOVWxnAXk2nmwx5An5vUkSXs71Swgdd1m+AFvYp8i22w92CVf7MADXCg6O8S9X2TiX6GQ==';

        const expectedError = 'Error: User not found!';

        await resolver.Mutation.loginUser({}, { data2 })
            .then(res => {
                console.log(res);
            }).catch(err => {
                expect(err.toString()).toBe(expectedError);
            });
    });
});