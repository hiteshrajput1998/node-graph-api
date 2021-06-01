import CryptoJS from 'crypto-js';
import { User } from '../../../models';
import Logger from '../../../logger';
import GraphError from '../../../graphError';
import { validateRequestData, transformUserData, REGISTER_USER_SCHEMA } from '../../../utils';
import { REGISTERED_SUCCESSFULLY } from '../../../constant';

const logger = new Logger('User', 'registerUser.js');

export default async (_, { inputRegister }, context, info) => {
    logger.log(`inputRegister: ${logger.stringify(inputRegister)}`);

    validateRequestData(inputRegister, REGISTER_USER_SCHEMA);

    try {

        const user = await User.findOne({ userName: inputRegister.userName });
        if (user) {
            throw new GraphError('User already exist');
        }

        console.log(`inputRegister.password: ${inputRegister.password}`);
        const encryptedPassword = CryptoJS.AES.encrypt(inputRegister.password, 'HRAlgorithm').toString();
        console.log(`encryptedPassword: ${encryptedPassword}`);

        const response = await User.create({ ...inputRegister, password: encryptedPassword });
        logger.log(`newUser: ${logger.stringify(response)}`);

        // const finalResponse = transformUserData(response);
        // logger.log(`finalResponse: ${logger.stringify(finalResponse)}`);

        return {
            message: REGISTERED_SUCCESSFULLY,
            data: response
        };
    } catch (error) {
        console.log(error.message);
        throw new GraphError(error.message);
    }
};