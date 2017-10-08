const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    entry: {
        main: [
            './src/app/index.js',
        ],
    },
    // Render source-map file for final build
    devtool: 'source-map',
    // output config
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'app.js', // Name of output file
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        // Transfer Files
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