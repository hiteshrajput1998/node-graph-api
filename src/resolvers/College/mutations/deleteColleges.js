import { validateRequestData, VALIDATE_IDS_SCHEMA } from '../../../utils';
import { College } from '../../../models/';
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { DOCUMENT_DELETED } from '../../../constant';

const logger = new Logger('College', 'deleteColleges.js');

export default async (_, { ids }) => {
    logger.log(`+deleteColleges arg: ${logger.stringify(ids)}`);

    validateRequestData({ ids }, VALIDATE_IDS_SCHEMA);

    try {

        let filterCollege = await College.find({ '_id': { $in: ids } });
        logger.log(`filterCollege: ${filterCollege}`);

        if (filterCollege.length === 0) {
            throw new GraphError('data is not exist');
        }

        let result = await College.deleteMany({ _id: { '$in': ids } });
        logger.log(`finalResult: ${logger.stringify(result)}`);

        return {
            message: `${result.n} ${DOCUMENT_DELETED}`
        };
    } catch (error) {
        throw new GraphError(error);
    }
};