const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    // Entry points to the project
    entry: {
        main: [
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            './src/app/index',
        ],
    },
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        hot: true, // Live-reload
        inline: true,
        port: 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            { from: 'www' },
        ], path.resolve(__dirname, 'src')),
    ],
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'
        }, {
            test: /\.jsx?$/, // Match both .js and .jsx files
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif|png)$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }],
    },
};

module.exports = config;