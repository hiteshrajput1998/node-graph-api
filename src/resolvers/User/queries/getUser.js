import MaskData from 'maskdata';
import { validateRequestData, transformUserData, VALIDATE_ID_SCHEMA, maskOption } from '../../../utils';
import Logger from '../../../logger';
import GraphError from '../../../graphError';
import { User } from '../../../models';
import { USER_NOT_FOUND } from '../../../constant';
import { getCityAndState } from '../../../services/getCityAndState/getCityAndState';

const logger = new Logger('User', 'getUser.js');

export default async (_, { id }, ctx, info) => {
    logger.log(`getUser - START argument-id ${id}`);

    info.cacheControl.setCacheHint({ maxAge: 10 });

    validateRequestData({ id }, VALIDATE_ID_SCHEMA);

    try {

        let user = await User.findOne({ _id: id });
        user.password = MaskData.maskPassword(user.password, maskOption('password'));
        user.email = MaskData.maskEmail2(user.email, maskOption('email'));
        logger.log(`user: ${logger.stringify(user)}`);

        if (!user) {
            throw new Error(USER_NOT_FOUND);
        }

        let cityAndState = await getCityAndState(380022);
        console.log(JSON.stringify(cityAndState));

        user.city = cityAndState[0].PostOffice[0].District;
        user.state = cityAndState[0].PostOffice[0].State;

        console.log(user);

        let finalResponse = transformUserData([user]);
        logger.log(`finalResponse: ${logger.stringify(finalResponse)}`);

        return finalResponse[0];
    } catch (error) {
        throw new GraphError(error);
    }
};