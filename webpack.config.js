/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// const path = require('path');

// module.exports = {
//     entry: './src/handler.js',
//     target: 'node',
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: [
//                     // Use an object instead of a string
//                     {
//                         test: path.resolve(__dirname, 'node_modules'),
//                         // Exclude the following from the exclusion
//                         exclude: path.resolve(__dirname, 'node_modules/.')
//                     }
//                 ],
//                 use: {
//                     loader: 'babel-loader',
//                     // ...
//                 },
//             },
//         ],
//     },
//     output: {
//         filename: 'bundle.js',
//         // eslint-disable-next-line no-undef
//         path: path.resolve(__dirname, 'dist'),
//     },
// };



// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//     entry: './src/handler.js',
//     target: 'node',
//     mode: 'development',
//     optimization: {
//         minimize: false,
//     },
//     performance: {
//         hints: false,
//     },
//     // devtool: 'source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: 'babel-loader',
//             },
//         ],
//     },
//     output: {
//         libraryTarget: 'commonjs',
//         path: path.join(__dirname, 'dist'),
//         filename: '[name].js',
//     },
//     devtool: 'source-map',
//     plugins: [
//         new webpack.DefinePlugin({ 'global.GENTLY': false }), // This is because I use `superagent`,
//     ],
// };


const nodeExternals = require('webpack-node-externals');
const serverlessWebpack = require('serverless-webpack');

module.exports = {
    entry: serverlessWebpack.lib.entries,
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\test.js$/,
                use: 'babel-loader',
            },
        ],
    },
    node: false,
    externals: [nodeExternals()],
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.js'],
    },
    target: 'node',
};