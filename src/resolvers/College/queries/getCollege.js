import GraphError from '../../../graphError';
import { College } from '../../../models';
import { validateRequestData, transformData, VALIDATE_ID_SCHEMA } from '../../../utils';
import Logger from '../../../logger';

const logger = new Logger('College', 'getCollege.js');

export default async (_, { id }, ctx, info) => {
    logger.log(`inputValue for getCollege: ${id}`);

    info.cacheControl.setCacheHint({ maxAge: 10 });

    validateRequestData({ id }, VALIDATE_ID_SCHEMA);

    try {

        let response = await College.findOne({ _id: id });
        logger.log(`response: ${logger.stringify(response)}`);

        let finalResponse = transformData([response]);
        logger.log(`finalResponse: ${logger.stringify(finalResponse)}`);

        return finalResponse;
    } catch (error) {
        throw new GraphError(error);
    }
};