import { ApolloError } from 'apollo-server-errors';
export default class GraphError extends ApolloError {
    constructor(message) {
        super(message);
        //Object.defineProperty(this, 'name', { value: message });
        this.message = message;
    }

    stringify() {
        return this;
    }
}