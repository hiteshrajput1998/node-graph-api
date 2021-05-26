import { validateRequestData, UPDATE_COLLEGE_SCHEMA } from '../../../utils';
import { College } from '../../../models/';
import { UPDATED_SUCCESSFULLY } from '../../../constant';
import GraphError from '../../../graphError';
import Logger from '../../../logger';

const logger = new Logger('College', 'updateCollege.js');

export default async (_, { id, input }) => {
    logger.log(`inputValue for update: ${logger.stringify(input)}`);

    validateRequestData({ ...input, id }, UPDATE_COLLEGE_SCHEMA);

    try {
        let updateCollege;

        await College.findByIdAndUpdate(id, input, { upsert: true });
        updateCollege = {
            ...updateCollege, ...{ id: id, collegeName: input.collegeName, address: input.address }
        }
        logger.log(`updateCollege: ${logger.stringify(updateCollege, null, 2)}`);

        return {
            message: UPDATED_SUCCESSFULLY,
            data: updateCollege
        };

    } catch (error) {
        throw new GraphError(error);
    }
}