import { validateRequestData, VALIDATE_ID_SCHEMA } from '../../../utils';
import { College } from '../../../models/';
import GraphError from '../../../graphError';
import { DELETED_SUCCESSFULLY } from '../../../constant';
import Logger from '../../../logger';

const logger = new Logger('College', 'deleteCollege.js');

export default async (_, { id }) => {
    logger.log(`+inputValue for delete: ${logger.stringify(id)}`);

    validateRequestData({ id }, VALIDATE_ID_SCHEMA);

    try {
        let filterCollege = await College.find({ '_id': id});
        logger.log(`filterCollege: ${filterCollege}`);

        if(filterCollege.length === 0){
            throw new GraphError('data is not exist');
        }

        let deleteCollege = await College.findOneAndDelete({ _id: id });
        logger.log(`+deleteCollege: ${logger.stringify(deleteCollege)}`);

        return {
            message: DELETED_SUCCESSFULLY
        };

    } catch (error) {
        throw new GraphError(error);
    }
};