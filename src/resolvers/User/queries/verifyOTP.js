import { validateRequestData, VALIDATE_OTP_SCHEMA } from '../../../utils';
import Logger from '../../../logger';
import GraphError from '../../../graphError';
import { Otp } from '../../../models';
import { USER_NOT_FOUND } from '../../../constant';

const logger = new Logger('User', 'getUser.js');

export default async (_, { otp, userName }, ctx, info) => {
    logger.log(`getUser - START arguments otp: ${otp} userName: ${userName}`);

    validateRequestData({ otp, userName }, VALIDATE_OTP_SCHEMA);

    try {

        let otpData = await Otp.findOne({ userName: userName });
        logger.log(`otpData: ${logger.stringify(otpData)}`);

        if (!otpData) {
            throw new Error(USER_NOT_FOUND);
        }

        if (otpData.otp !== otp) {
            throw new GraphError('Otp does not match');
        }

        return 'Otp matched';
    } catch (error) {
        throw new GraphError(error.message);
    }
};