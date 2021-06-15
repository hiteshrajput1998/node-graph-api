import { validateRequestData, VALIDATE_OTP_SCHEMA } from '../../../utils';
import Logger from '../../../logger';
import GraphError from '../../../graphError';
import { Otp } from '../../../models';
import { USER_NOT_FOUND } from '../../../constant';

const logger = new Logger('User', 'getUser.js');

export default async (_, { otp, email }, ctx, info) => {
    logger.log(`getUser - START arguments otp: ${otp} email: ${email}`);

    validateRequestData({ otp, email }, VALIDATE_OTP_SCHEMA);

    try {

        let otpData = await Otp.findOne({ email: email });
        logger.log(`otpData: ${logger.stringify(otpData)}`);

        if (!otpData) {
            throw new Error(USER_NOT_FOUND);
        }

        if (otpData.otp !== otp) {
            return 'Otp does not match';
        }

        return 'Otp matched';
    } catch (error) {
        throw new GraphError(error);
    }
};