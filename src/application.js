import { GraphQLModule } from '@graphql-modules/core';
// import { collegeModule, userModule } from './modules';
import { collegeModule } from './modules/collegeModule';
import { userModule } from './modules/userModule';
import { imageModule } from './modules/imageModule';
import { newsModule } from './modules/newsModule';
import { weatherModule } from './modules/weatherModule';

const application = new GraphQLModule({
    imports: [collegeModule, userModule, imageModule, newsModule, weatherModule]
});

export const mySchema = application;