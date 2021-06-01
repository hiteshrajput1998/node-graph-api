import { validateRequestData, CREATE_COLLEGE_SCHEMA, transformData } from '../../../utils';
import { College } from '../../../models/';
import GraphError from '../../../graphError';
import { CREATED_SUCCESSFULLY } from '../../../constant';
import Logger from '../../../logger';

const logger = new Logger('College', 'createCollege.js');

export default async (_, { input }, context) => {
    logger.log(`+inputValue for create: ${logger.stringify(input)}`);

    validateRequestData(input, CREATE_COLLEGE_SCHEMA);

    try {

        let response = await College.create(input);
        logger.log(`+createCollege: ${logger.stringify(response)}`);

        // let finalResponse = transformData([response]);
        // logger.log(`finalCollege response: ${logger.stringify(finalResponse)}`);

        return {
            message: CREATED_SUCCESSFULLY,
            data: response
        };
    }
    catch (e) {
        logger.error(`Error: ${logger.stringify(e, null, 2)}`);
        throw new GraphError(e);
    }

};