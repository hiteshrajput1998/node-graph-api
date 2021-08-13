/* eslint-disable no-undef */
// /* eslint-disable no-undef */


// const nodeExternals = require('webpack-node-externals');
// const serverlessWebpack = require('serverless-webpack');

// module.exports = {
//     entry: serverlessWebpack.lib.entries,
//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 exclude: /node_modules/,
//                 test: /\test.js$/,
//                 use: 'babel-loader',
//             },
//         ],
//     },
//     node: false,
//     externals: [nodeExternals()],
//     optimization: {
//         minimize: false,
//     },
//     resolve: {
//         extensions: ['.js'],
//     },
//     target: 'node',
// };

const path = require('path');

module.exports = {
    entry: './src/handler.js',
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\test.js$/
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js'
    },
    target: 'node',
};