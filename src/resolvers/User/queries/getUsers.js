import MaskData from 'maskdata';
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { User } from '../../../models';
import { maskOption, transformUserData } from '../../../utils';

const logger = new Logger('User', 'getUsers.js');

export default async (event, context, ctx, info) => {
    logger.log(`getUsers - START event: ${logger.stringify(event)} context: ${logger.stringify(context)}`);
    
    info.cacheControl.setCacheHint({ maxAge: 10 });

    try {
        let users = await User.find();

        users.forEach(item => {
            item.email = MaskData.maskEmail2(item.email, maskOption('email'));
        });

        logger.log(`users: ${logger.stringify(users)}`);

        let finalResponse = transformUserData(users);
        logger.log(`transformUser data: ${logger.stringify(finalResponse)}`);

        return finalResponse;

    } catch (error) {
        throw new GraphError(error.message);
    }
};