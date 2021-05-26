export const middleware = {
    Query: {
        getcolleges: async (resolve, parent, args, context, info) => {
            // You can use middleware to override arguments
            const argsWithDefault = { ...args };
            const result = await resolve(parent, argsWithDefault, context, info);
            console.log(`result: ${JSON.stringify(result)}`);
            // Or change the returned values of resolvers
            return result;
            // return result.replace(/Trump/g, 'beep');
        },
    },
};
