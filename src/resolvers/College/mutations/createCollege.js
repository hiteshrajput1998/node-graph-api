import { validateRequestData, CREATE_COLLEGE_SCHEMA } from '../../../utils';
import { College } from '../../../models/';
import GraphError from '../../../graphError';
import { CREATED_SUCCESSFULLY } from '../../../constant';
import Logger from '../../../logger';

const logger = new Logger('College', 'createCollege.js');

export default async (_, { input }, context) => {
    logger.log(`+inputValue for create: ${logger.stringify(input)}`);

    validateRequestData(input, CREATE_COLLEGE_SCHEMA);

    try {

        let newCollege = await College.create(input);
        logger.log(`+createCollege: ${logger.stringify(newCollege)}`);

        return {
            message: CREATED_SUCCESSFULLY,
            data: newCollege
        };
    }
    catch (e) {
        logger.error(`Error: ${logger.stringify(e, null, 2)}`);
        throw new GraphError(e);
    }

};