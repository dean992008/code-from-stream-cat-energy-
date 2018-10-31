const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin2');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        scripts: [
            './sass/style.scss'
        ]
    },
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'js/'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".sass", ".scss", ".css"],
        modules: ['./node_modules/'],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.s[a|c]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader?-url"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader?-url"
                        },
                    ],
                    fallback: "style-loader"
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('../css/style.css');
            },
            allChunks: true
        }),
        new CssoWebpackPlugin(),
        new UglifyJSPlugin(),
        new BrowserSyncPlugin({
            port: 3100,
            server: "./",
            baseDir: "./",
            files: ['./*html', './sass/**/*.scss']
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true,
                },
            }
        })
    ],
    stats: {
        modules: false,
    }
}