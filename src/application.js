import { GraphQLModule } from '@graphql-modules/core';
// import { collegeModule, userModule } from './modules';
import { collegeModule } from './modules/collegeModule';
import { userModule } from './modules/userModule';
import { imageModule } from './modules/imageModule';

const application = new GraphQLModule({
    imports: [collegeModule, userModule, imageModule]
});

export const mySchema = application;